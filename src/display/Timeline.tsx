import React, { Reducer, useContext, useReducer } from "react";

import { Modal, ModalContent, ModalTrigger } from "./Modal";
import styles from "./timeline.module.css";

type State = {
  startDate: Date,
  endDate: Date
};

type Action = {};

const initialState: State = {
  startDate: new Date(),
  endDate: new Date()
};

const reducer: Reducer<State, Action> = (state, action) => {
  return state;
};

const TimelineContext = React.createContext<State>(initialState);

export const Timeline: React.FC<{ startDate?: Date, endDate?: Date }> = ({
  children,
  startDate = initialState.startDate,
  endDate = initialState.endDate
}) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, { ...initialState, startDate, endDate });

  return (
    <TimelineContext.Provider value={state}>
      <div className={styles.timeline}>
        <div className={styles.line}>
          <TimelineTicks />
          {children}
        </div>
      </div>
    </TimelineContext.Provider>
  );
};

function getTimelinePercentage(startDate: Date, endDate: Date, date: Date) {
  return (date.valueOf() - startDate.valueOf()) / (endDate.valueOf() - startDate.valueOf()) * 100;
}

const TimelineTicks: React.FC = () => {
  const { startDate, endDate } = useContext(TimelineContext);
  const delta = endDate.valueOf() - startDate.valueOf();

  if (delta >= 3 * 365 * 24 * 60 * 60 * 1000) {
    return <TimelineYearTicks />;
  }

  if (delta >= 3 * 30 * 24 * 60 * 60 * 1000) {
    return <TimelineMonthTicks />;
  }

  return <TimelineDayTicks />;
};

const TimelineYearTicks: React.FC = () => {
  const { startDate, endDate } = useContext(TimelineContext);

  const minimum = startDate.getUTCFullYear() + 1;
  const maximum = endDate.getUTCFullYear();

  return (
    <>
      {new Array(maximum - minimum).fill(null).map((_value, index) => {
        const year = minimum + index;

        return (
          <TimelineTick key={year} date={new Date(Date.UTC(year, 0, 1))}>
            {year}
          </TimelineTick>
        );
      })}
    </>
  );
};

const TimelineMonthTicks: React.FC = () => {
  throw "Not yet implemented";
};

const TimelineDayTicks: React.FC = () => {
  throw "Not yet implemented";
};

const TimelineTick: React.FC<{ date: Date }> = ({ date }) => {
  const { startDate, endDate } = useContext(TimelineContext);
  const percentage = getTimelinePercentage(startDate, endDate, date);

  return <div className={styles.tick} style={{ left: `${percentage}%` }} />;
};

export const TimelineEntry: React.FC<{ date: Date }> = ({ children, date }) => {
  const { startDate, endDate } = useContext(TimelineContext);

  if (startDate > date || endDate < date) {
    return null;
  }

  const percentage = getTimelinePercentage(startDate, endDate, date);

  return (
    <div className={styles.entry} style={{ left: `${percentage}%` }}>
      {children}
    </div>
  );
};

export const TimelineMarker: React.FC = ({ children }) => (
  <div className={styles.marker}>{children}</div>
);

export const TimelineTooltip: React.FC = ({ children }) => (
  <div className={styles.tooltip}>{children}</div>
);
