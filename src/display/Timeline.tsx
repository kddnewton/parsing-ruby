import React, { Dispatch, Reducer, useCallback, useContext, useMemo, useState, useReducer, useRef } from "react";
import { useId } from "@reach/auto-id";
import { createDescendantContext, DescendantProvider, useDescendant, useDescendantsInit } from "@reach/descendants";

import styles from "./timeline.module.css";

type State = {
  timelineId: string,
  activeEntryIndex: number,
  startDate: Date,
  endDate: Date
};

type Action = (
  { type: "select", index: number }
);

const initialState: State = {
  timelineId: "",
  activeEntryIndex: -1,
  startDate: new Date(),
  endDate: new Date()
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "select":
      return { ...state, activeEntryIndex: action.index };
    default:
      throw `Unknown action: ${action.type}`;
  }
};

const TimelineEntriesContext = createDescendantContext("TimelineEntriesContext");
const TimelineStateContext = React.createContext<State>(initialState);
const TimelineDispatchContext = React.createContext<Dispatch<Action>>(() => {});

export const Timeline: React.FC<{ id?: string, startDate?: Date, endDate?: Date }> = ({
  children,
  id,
  startDate = initialState.startDate,
  endDate = initialState.endDate
}) => {
  const [entries, setEntries] = useDescendantsInit();
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, {
    ...initialState,
    timelineId: `timeline-${useId(id)}`,
    startDate,
    endDate
  });

  return (
    <DescendantProvider context={TimelineEntriesContext} items={entries} set={setEntries}>
      <TimelineStateContext.Provider value={state}>
        <TimelineDispatchContext.Provider value={dispatch}>
          <div className={styles.timeline} data-react-timeline>
            <div
              className={styles.line}
              role="menu"
              aria-labelledby={state.timelineId}
              aria-activedescendant={state.activeEntryIndex.toString()}
              tabIndex={-1}
            >
              <TimelineTicks />
              {children}
            </div>
          </div>
        </TimelineDispatchContext.Provider>
      </TimelineStateContext.Provider>
    </DescendantProvider>
  );
};

function getTimelinePercentage(startDate: Date, endDate: Date, date: Date) {
  return (date.valueOf() - startDate.valueOf()) / (endDate.valueOf() - startDate.valueOf()) * 100;
}

type TimelineTick = {
  title: string,
  date: Date,
  percentage: number
};

function getTimelineTicks(startDate: Date, endDate: Date) {
  const ticks: TimelineTick[] = [];
  const delta = endDate.valueOf() - startDate.valueOf();

  if (delta >= 3 * 365 * 24 * 60 * 60 * 1000) {
    for (let year = startDate.getUTCFullYear() + 1; year < endDate.getUTCFullYear(); year += 1) {
      const date = new Date(Date.UTC(year, 0, 1));

      ticks.push({
        title: year.toString(),
        date: date,
        percentage: getTimelinePercentage(startDate, endDate, date)
      });
    }
  } else if (delta >= 3 * 30 * 24 * 60 * 60 * 1000) {
    throw "Not yet implemented";
  } else {
    throw "Not yet implemented";
  }

  return ticks;
}

const TimelineTicks: React.FC = () => {
  const { startDate, endDate } = useContext(TimelineStateContext);
  const ticks = useMemo(() => getTimelineTicks(startDate, endDate), [startDate, endDate]);

  return (
    <>
      {ticks.map(({ title, date, percentage }) => (
        <div
          key={date.valueOf()}
          aria-label={title}
          className={styles.tick}
          style={{ left: `${percentage}%` }}
        />
      ))}
    </>
  );
};

export const TimelineEntry: React.FC<{ date: Date }> = ({ children, date }) => {
  const { activeEntryIndex, startDate, endDate } = useContext(TimelineStateContext);
  const dispatch = useContext(TimelineDispatchContext);

  const elementRef = useRef(null);
  const [element, setElement] = useState(null);

  const onElementSet = useCallback((value) => {
    elementRef.current = value;
    setElement(value);
  }, []);

  const entry = useMemo(() => ({ element, date }), [element, date]);
  const entryIndex = useDescendant(entry, TimelineEntriesContext);

  // Verify that the entry is visible within the current bounds of the timeline
  if (startDate > date || endDate < date) {
    return null;
  }

  const percentage = getTimelinePercentage(startDate, endDate, date);

  return (
    <div
      className={styles.entry}
      ref={onElementSet}
      role="menuitem"
      data-selected={entryIndex === activeEntryIndex}
      onMouseEnter={() => dispatch({ type: "select", index: entryIndex })}
      tabIndex={-1}
      style={{ left: `${percentage}%` }}
    >
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
