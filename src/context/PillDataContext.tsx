import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import Storage from "../../Storage";

export type Notification = {
  id: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
};

export type PillData = {
  id: number;
  name: string;
  hours: number;
  minutes: number;
  selectedStartingDay: string;
  selectedEndingDay: string;
  placeboDays: number;
  notifications: Notification[];
};

type PillDataAction =
  | { type: "set"; payload: PillData }
  | {
      type: "cancelNotifications";
      payload: Notification[];
    };

const PillDataContext = createContext<PillData>({} as PillData);
const PillDataDispatchContext = createContext<Dispatch<PillDataAction>>(
  {} as Dispatch<PillDataAction>
);

type PillDataProviderProps = {
  children: ReactNode;
};

export function PillDataProvider({ children }: PillDataProviderProps) {
  const [pillData, dispatch] = useReducer(pillDataReducer, initialPillData);

  useEffect(() => {
    Storage.load({ key: "pill2" }).then((p) =>
      dispatch({ type: "set", payload: p })
    );
  }, []);

  return (
    <PillDataContext.Provider value={pillData}>
      <PillDataDispatchContext.Provider value={dispatch}>
        {children}
      </PillDataDispatchContext.Provider>
    </PillDataContext.Provider>
  );
}

export function usePillData() {
  return useContext(PillDataContext);
}

export function usePillDataDispatch() {
  return useContext(PillDataDispatchContext);
}

function pillDataReducer(pillData: PillData, action: PillDataAction): PillData {
  switch (action.type) {
    case "set": {
      Storage.save({ key: "pill2", data: action.payload });
      return action.payload; //para actualizar el estado actual de PillData.
    }
    case "cancelNotifications": {
      const notifications = pillData.notifications.filter(
        (n, index) => n.id != action.payload[index].id
      );
      const newPillData = {
        ...pillData,
        notifications: notifications,
      };
      Storage.save({ key: "pill2", data: newPillData });
      return newPillData;
    }
    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

const initialPillData: PillData = {
  name: "",
  id: 0,
  hours: 0,
  minutes: 0,
  selectedStartingDay: "",
  selectedEndingDay: "",
  placeboDays: 0,
  notifications: [],
};
