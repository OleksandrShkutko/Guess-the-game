import { useState, useEffect, useRef, createContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { DEFAULT_QUERY_FOR_ONE_GAME } from '../../constants';
import type { Game, Genres, GamesNames } from '../../types';
import GameBlock from './components/GameBlock';
import Spinner from '../../components/Spinner';
import CenteredContainer from '../../components/Container';
import GameScore from './components/GameScore';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRightAnswer,
  setAnswer,
  setGameScoreResult,
  type StoreType,
} from '../../store';
import BottomButtons from './components/BottomButtons';
import QuitGameDialog from './components/QuitGameDialog';
import NotEnoughGames from './components/NotEnoughGames';
import ErrorBlock from './components/ErrorBlock';

type GameContextType = {
  isCorrectAnswer: boolean | null;
  getNewGame: () => void;
};

// Create GameContext to share data across components
const GameContext = createContext<GameContextType>({
  isCorrectAnswer: null,
  getNewGame: () => {},
});

const GamePage = () => {
  const dispatch = useDispatch();

  // Get total count of games from loader data
  const countOfGames: number = useLoaderData();

  // Component states
  const [isPending, setIsPending] = useState(true);
  const [gameInfo, setGameInfo] = useState<Game | null>(null);
  const [gamesNames, setGamesNames] = useState<GamesNames>([]);
  const [gameScore, setGameScore] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get data from the store
  const requestUrl = useSelector(
    (state: StoreType) => state.settings.requestUrl
  );
  const answer = useSelector(
    (state: StoreType) => state.gameButtonsGrid.answer
  );
  const rightAnsver = useSelector(
    (state: StoreType) => state.gameButtonsGrid.rightAnswer
  );
  const selectedGenres = useSelector(
    (state: StoreType) => state.settings.selectedGenres
  );

  // Ref to track if component has mounted
  const hasMounted = useRef(false);

  useEffect(() => {
    // On initial mount, fetch a new random game
    if (!hasMounted.current) {
      hasMounted.current = true;
      getNewGame();
    }

    // Detect page refresh and show alert
    const unloadCallback = (event: BeforeUnloadEvent): string | void => {
      event.preventDefault();
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);

  // When gameInfo changes, fetch similar games and update gamesNames
  useEffect(() => {
    if (gameInfo) {
      (async () => {
        setIsCorrectAnswer(null);
        dispatch(setRightAnswer(gameInfo.name));

        await setGamesNames([gameInfo.name]);

        const countOfGamesWithGenre = await getCountOfGamesWithGenre(
          gameInfo.ganres
        );
        await getGameWithTheSameMainGenre(
          gameInfo.ganres,
          countOfGamesWithGenre
        );
        await getGameWithTheSameMainGenre(
          gameInfo.ganres,
          countOfGamesWithGenre
        );
        await getGameWithTheSameMainGenre(
          gameInfo.ganres,
          countOfGamesWithGenre
        );

        setGamesNames((prevNames) => shuffleNamesArray(prevNames));

        setIsPending(false);
      })();
    }
  }, [gameInfo]);

  // When answer changes, check if it's correct and update score
  useEffect(() => {
    if (answer !== '') {
      if (answer === rightAnsver) {
        setIsCorrectAnswer(true);
        setGameScore(gameScore + 1);
      } else {
        dispatch(setGameScoreResult(gameScore));
        setIsCorrectAnswer(false);
        setGameScore(0);
      }
    }
  }, [answer]);

  // Fetches a random game from the API
  const requestRandomGame = async (url: string): Promise<Game | void> => {
    let gameInfoObj: Game;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const gameName = data.results[0].name;
      const gameImage = data.results[0].background_image;
      const gameId = data.results[0].id;
      const gameGenres = data.results[0].genres.map(
        (genre: { id: number }) => genre.id
      );

      gameInfoObj = {
        id: gameId,
        name: gameName,
        background_image: gameImage,
        ganres: gameGenres,
      };

      return gameInfoObj;
    } catch (err) {
      setIsPending(false);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  // Gets a new random game and updates the state
  const getNewGame = async (): Promise<void> => {
    setIsPending(true);
    setError(null);
    dispatch(setAnswer(''));

    const randomGameNumber: number = getRandomInt(1, countOfGames);
    const finalRequestUrl: string = `${requestUrl}&page=${randomGameNumber}${DEFAULT_QUERY_FOR_ONE_GAME}`;

    const gameInfoObj = await requestRandomGame(finalRequestUrl);

    if (typeof gameInfoObj === 'object') {
      setGameInfo(gameInfoObj);
    }
  };

  // Fetches a game with the same main genre as the provided genres
  const getGameWithTheSameMainGenre = async (
    genres: Genres,
    countOfGamesWithGenre: number
  ): Promise<void> => {
    const formatGenres = genres.map((genre) => genre).join(',');
    const formatGenresQueryString =
      formatGenres && !selectedGenres.length ? `&genres=${formatGenres}` : '';
    const randomGameWithGenreNumber: number = getRandomInt(
      1,
      countOfGamesWithGenre
    );
    const finalRequestUrl: string = `${requestUrl}${DEFAULT_QUERY_FOR_ONE_GAME}${formatGenresQueryString}&page=${randomGameWithGenreNumber}`;

    const gameWithGenreInfoObj = await requestRandomGame(finalRequestUrl);

    if (typeof gameWithGenreInfoObj === 'object') {
      setGamesNames((prevNames) => [...prevNames, gameWithGenreInfoObj.name]);
    }
  };

  // Gets the total count of games with the specified genres
  const getCountOfGamesWithGenre = async (genres: Genres): Promise<number> => {
    const formatGenres = genres.map((genre) => genre).join(',');
    const formatGenresQueryString =
      formatGenres && !selectedGenres.length ? `&genres=${formatGenres}` : '';
    const response = await fetch(
      `${requestUrl}${DEFAULT_QUERY_FOR_ONE_GAME}${formatGenresQueryString}`
    );
    const data = await response.json();
    const countOfGamesWithGenre: number =
      data.count <= 10000 ? data.count : 10000;

    return countOfGamesWithGenre;
  };

  // Returns a random integer between min (inclusive) and max (inclusive)
  const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Shuffles an array elements
  const shuffleNamesArray = (array: GamesNames): GamesNames => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <>
      <CenteredContainer>
        {isPending ? (
          <Spinner />
        ) : (
          <>
            {!error ? (
              <>
                {gameInfo && countOfGames >= 100 && (
                  <>
                    <GameScore score={gameScore} />
                    <GameContext.Provider
                      value={{ isCorrectAnswer, getNewGame }}
                    >
                      <GameBlock gameInfo={gameInfo} gamesNames={gamesNames} />
                      <BottomButtons />
                    </GameContext.Provider>
                  </>
                )}
                {gameInfo && countOfGames < 100 && <NotEnoughGames />}
              </>
            ) : (
              <ErrorBlock error={error} getNewGame={getNewGame} />
            )}
          </>
        )}
      </CenteredContainer>

      <QuitGameDialog score={gameScore} />
    </>
  );
};

export { GameContext };
export default GamePage;
