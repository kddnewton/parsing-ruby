import React, { Dispatch, Reducer, useCallback, useContext, useMemo, useState, useReducer, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useId } from "@reach/auto-id";
import { createDescendantContext, Descendant, DescendantProvider, useDescendant, useDescendantsInit } from "@reach/descendants";

import "./timeline.css";

type State = {
  tooltipRef: React.RefObject<HTMLDivElement> | null,
  timelineId: string,
  activeEntryIndex: number,
  startDate: Date,
  endDate: Date,
  hasReadHash: boolean
};

type Action = (
  | { type: "select", index: number }
  | { type: "left", length: number }
  | { type: "right", length: number }
);

const initialState: State = {
  tooltipRef: null,
  timelineId: "",
  activeEntryIndex: 0,
  startDate: new Date(),
  endDate: new Date(),
  hasReadHash: false
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "select":
      return { ...state, activeEntryIndex: action.index, hasReadHash: true };
    case "left":
      return { ...state, activeEntryIndex: (state.activeEntryIndex <= 0 ? action.length : state.activeEntryIndex) - 1 };
    case "right":
      return { ...state, activeEntryIndex: (state.activeEntryIndex + 1) % action.length };
    default:
      throw `Unknown action: ${(action as any).type}`;
  }
};

const TimelineEntriesContext = createDescendantContext("TimelineEntriesContext");
type TimelineEntriesEntry = Descendant & { date?: Date };

const TimelineStateContext = React.createContext<State>(initialState);
const TimelineDispatchContext = React.createContext<Dispatch<Action>>(() => {});

function useTimelineKeyboardControls(dispatch: Dispatch<Action>, length: number) {
  useEffect((): (() => void) => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          dispatch({ type: "left", length });
          break;
        case "ArrowRight":
          dispatch({ type: "right", length });
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [dispatch, length]);
}

function useTimelineTouchControls(dispatch: Dispatch<Action>, length: number) {
  useEffect((): (() => void) => {
    let touchStartX: number;

    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.changedTouches[0].screenX;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const { screenX } = event.changedTouches[0];
      dispatch({ type: touchStartX < screenX ? "left" : "right", length });
    };

    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [dispatch, length]);
}

function serializeDate(date: Date) {
  return `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`;
}

function useActiveEntryHashHistory(dispatch: Dispatch<Action>, activeEntryIndex: number, entries: TimelineEntriesEntry[], hasReadHash: boolean) {
  const previousActiveEntry = useRef(activeEntryIndex);

  useEffect((): void => {
    if (location.hash !== "#" && !hasReadHash) {
      const serialized = location.hash.slice(1);
      const index = entries.findIndex((entry) => entry.date && serializeDate(entry.date) === serialized);

      if (index !== -1) {
        dispatch({ type: "select", index });
      }
    }
  }, [dispatch, entries, hasReadHash])

  useEffect((): void => {
    if (previousActiveEntry.current !== activeEntryIndex) {
      previousActiveEntry.current = activeEntryIndex;
      const entry = entries[activeEntryIndex];
      location.hash = entry?.date ? `#${serializeDate(entry.date)}` : "#";
    }
  }, [dispatch, activeEntryIndex, entries, previousActiveEntry])
}

export const Timeline: React.FC<{ id?: string, startDate?: Date, endDate?: Date }> = ({
  children,
  id,
  startDate = initialState.startDate,
  endDate = initialState.endDate
}) => {
  const tooltipRef = useRef(null);
  const [entries, setEntries] = useDescendantsInit<TimelineEntriesEntry>();
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, {
    ...initialState,
    tooltipRef,
    timelineId: `timeline-${useId(id)}`,
    startDate,
    endDate
  });

  useTimelineKeyboardControls(dispatch, entries.length);
  useTimelineTouchControls(dispatch, entries.length);
  useActiveEntryHashHistory(dispatch, state.activeEntryIndex, entries, state.hasReadHash);

  return (
    <DescendantProvider context={TimelineEntriesContext} items={entries} set={setEntries}>
      <TimelineStateContext.Provider value={state}>
        <TimelineDispatchContext.Provider value={dispatch}>
          {children}
        </TimelineDispatchContext.Provider>
      </TimelineStateContext.Provider>
    </DescendantProvider>
  );
};

export const TimelineLine: React.FC = ({ children }) => {
  const { timelineId, activeEntryIndex } = useContext(TimelineStateContext);

  return (
    <div
      data-react-timeline-line
      role="menu"
      aria-labelledby={timelineId}
      aria-activedescendant={activeEntryIndex.toString()}
      tabIndex={-1}
    >
      <TimelineTicks />
      {children}
    </div>
  );
};

export const TimelineTooltip: React.FC = () => {
  const { tooltipRef } = useContext(TimelineStateContext);

  return <div ref={tooltipRef} />;
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
          data-react-timeline-tick
          key={date.valueOf()}
          aria-label={title}
          style={{ left: `${percentage}%` }}
        />
      ))}
    </>
  );
};

const TimelineEntryContext = React.createContext<boolean>(false);

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

  const selected = entryIndex === activeEntryIndex;
  const percentage = getTimelinePercentage(startDate, endDate, date);

  return (
    <TimelineEntryContext.Provider value={selected}>
      <div
        ref={onElementSet}
        role="menuitem"
        data-selected={selected}
        onMouseEnter={() => dispatch({ type: "select", index: entryIndex })}
        tabIndex={-1}
        style={{ position: "absolute", left: `${percentage}%` }}
      >
        {children}
      </div>
    </TimelineEntryContext.Provider>
  );
};

export const TimelineEntryTooltip: React.FC = ({ children }) => {
  const { tooltipRef } = useContext(TimelineStateContext);
  const selected = useContext(TimelineEntryContext);

  if (!selected || !tooltipRef || !tooltipRef.current) {
    return null;
  }

  return ReactDOM.createPortal(children, tooltipRef.current);
};
