import classNames from "classnames";
import React, { useMemo } from "react";
import { UUI } from "../../core/uui";

export interface BaseProgressBarProps {
  /**
   * The value to display in the input field.
   */
  value: number;
  /**
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether this ProgressBar is shown in the circular style or not.
   * @default fales
   */
  circular?: boolean;
  /**
   * Whether the ProgressBar is indeterminate or not.
   * @default false
   */
  indeterminate?: boolean;
}

export const ProgressBar = UUI.FunctionComponent(
  {
    name: "ProgressBar",
    nodes: {
      Root: "div",
      Container: "div",
      BarFill: "div",
      CircularWrapper: "div",
      CircularBackground: "div",
      CircularLeftWrapper: "div",
      CircularRightWrapper: "div",
      CircularLeft: "div",
      CircularRight: "div",
    },
  },
  (props: BaseProgressBarProps, nodes) => {
    const {
      Root,
      Container,
      BarFill,
      CircularWrapper,
      CircularBackground,
      CircularLeftWrapper,
      CircularRightWrapper,
      CircularLeft,
      CircularRight,
    } = nodes;

    /**
     * Calculate the position and size of thumbs, remarks and lines.
     */
    const styles = useMemo(() => {
      const value = Math.max(0, Math.min(1, props.value));

      switch (props.circular) {
        case false:
        case undefined:
          return {
            BarFill: {
              width: toPercentage(value),
            },
          };
        case true:
          return {
            CircularLeft: {
              ...(!props.indeterminate
                ? {
                    opacity: props.value < 0.5 ? 0 : 1,
                    transform: value >= 0.5 ? `rotate(-${(1 - (value - 0.5) / 0.5) * 180}deg)` : "none",
                  }
                : null),
            },
            CircularRight: {
              transform: !props.indeterminate && value <= 0.5 ? `rotate(-${(1 - value / 0.5) * 180}deg)` : undefined,
            },
          };
      }
    }, [props.value, props.circular, props.indeterminate]);

    return (
      <Root
        className={classNames({
          disabled: props.disabled,
          circular: props.circular,
          indeterminate: props.indeterminate,
        })}
      >
        <Container>
          {!props.circular ? (
            <BarFill style={{ ...styles.BarFill }} />
          ) : (
            <CircularWrapper>
              <CircularLeftWrapper>
                <CircularLeft style={{ ...styles.CircularLeft }} />
              </CircularLeftWrapper>
              <CircularRightWrapper>
                <CircularRight style={{ ...styles.CircularRight }} />
              </CircularRightWrapper>
              <CircularBackground />
            </CircularWrapper>
          )}
        </Container>
      </Root>
    );
  }
);

export type ProgressBarProps = Parameters<typeof ProgressBar>[0];

const toPercentage = (n: number) => `${(n * 100).toFixed(4)}%`;
