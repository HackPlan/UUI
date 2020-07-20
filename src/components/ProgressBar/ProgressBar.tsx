import classNames from "classnames";
import React, { useMemo, useRef, useEffect } from "react";
import { UUI } from "../../core/uui";

export interface BaseProgressBarProps {
  /**
   * The value to display in the input field.
   */
  value: number;
  /**
   * Event handler invoked when input value is changed.
   */
  onChange: (value: [number, number] | number) => void;
  /**
   * The minimum value of the input.
   */
  min: number;
  /**
   * The maximum value of the input.
   */
  max: number;
  /**
   * Line width of the progress bar.
   * @default '5px'
   */
  barWidth?: string;
  /**
   * Progress bar color.
   * @default ''
   */
  barColor?: string;
  /**
   * Background color.
   * @default 'transparent'
   */
  backgroundColor?: string;
  /**
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether to render the Slider vertically. Defaults to rendering horizontal.
   * @default false
   */
  vertical?: boolean;
  /**
   * Whether this ProgressBar is shown in the circular style or not.
   * @default fales
   */
  circular?: boolean;
}

export const ProgressBar = UUI.FunctionComponent(
  {
    name: "ProgressBar",
    nodes: {
      Root: "div",
      Container: "div",
      BarFill: "div",
      CircularWrapper: "div",
      CircularLeftWrapper: "div",
      CircularRightWrapper: "div",
      CircularFill: "div",
      CircularSpinner: "div",
    },
  },
  (props: BaseProgressBarProps, nodes) => {
    const {
      Root,
      Container,
      BarFill,
      CircularWrapper,
      CircularLeftWrapper,
      CircularRightWrapper,
      CircularFill,
      CircularSpinner,
    } = nodes;

    const rootRef = useRef<any>();

    /**
     * Calculate the position and size of thumbs, remarks and lines.
     */
    const styles = useMemo(() => {
      const value = Math.max(0, Math.min(1, props.value));
      const barWidth = props.barWidth || "5px";
      const backgroundColor = props.backgroundColor || "transparent";

      switch (props.circular) {
        case false:
        case undefined:
          return {
            Container: {
              borderRadius: `${barWidth}`,
              backgroundColor: backgroundColor,
            },
            BarFill: {
              width: toPercentage(value),
              borderWidth: barWidth,
              borderRadius: `${barWidth}`,
            },
          };
        case true:
          return {
            CircularWrapper: {
              borderWidth: barWidth,
              borderColor: props.barColor,
            },
            CircularFill: {
              width: `calc(100% - ${barWidth})`,
              height: `calc(100% - 2 * ${barWidth})`,
              borderWidth: barWidth,
              transform: value > 0.5 ? "none" : `rotate(-${(1 - value / 0.5) * 180}deg)`,
            },
            CircularSpinner: {
              opacity: props.value < 0.5 ? 0 : 1,
              width: `calc(100% - ${barWidth})`,
              height: `calc(100% - 2 * ${barWidth})`,
              borderWidth: barWidth,
              transform: value >= 0.5 ? `rotate(-${(1 - (value - 0.5) / 0.5) * 180}deg)` : "none",
            },
          };
      }
    }, [props.value, props.circular, props.barWidth, props.barColor, props.backgroundColor]);

    return (
      <Root
        className={classNames({
          disabled: props.disabled,
          circular: props.circular,
        })}
        ref={rootRef}
      >
        <Container style={{ ...styles.Container }}>
          <BarFill style={{ ...styles.BarFill }} />
          <CircularWrapper style={{ ...styles.CircularWrapper }}>
            <CircularLeftWrapper>
              <CircularSpinner style={{ ...styles.CircularSpinner }} />
            </CircularLeftWrapper>
            <CircularRightWrapper>
              <CircularFill style={{ ...styles.CircularFill }} />
            </CircularRightWrapper>
          </CircularWrapper>
        </Container>
      </Root>
    );
  }
);

export type ProgressBarProps = Parameters<typeof ProgressBar>[0];

const toPercentage = (n: number) => `${(n * 100).toFixed(4)}%`;
