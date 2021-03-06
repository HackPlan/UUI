import React, { useMemo } from "react";
import { clamp } from "lodash-es";
import { UUIFunctionComponent, UUIFunctionComponentProps } from "../../core";
import { createComponentPropTypes, PropTypes } from "../../utils/createPropTypes";

export interface ProgressBarFeatureProps {
  /**
   * The value to display in the input field.
   */
  value?: number;
  /**
   * Whether the control is non-interactive.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether this ProgressBar is shown in the circular style or not.
   * @default false
   */
  circular?: boolean;
  /**
   * Whether the ProgressBar is indeterminate or not.
   * @default false
   */
  indeterminate?: boolean;
}

export const ProgressBarPropTypes = createComponentPropTypes<ProgressBarFeatureProps>({
  value: PropTypes.number,
  disabled: PropTypes.bool,
  circular: PropTypes.bool,
  indeterminate: PropTypes.bool,
})

export const ProgressBar = UUIFunctionComponent(
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
    propTypes: ProgressBarPropTypes,
  },
  (props: ProgressBarFeatureProps, { nodes, NodeDataProps }) => {
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

    const finalProps = {
      value: props.value === undefined ? 0 : props.value
    }

    /**
     * Calculate the position and size of thumbs, remarks and lines.
     */
    const styles = useMemo(() => {
      const value = Math.max(0, Math.min(1, finalProps.value));

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
                    opacity: finalProps.value < 0.5 ? 0 : 1,
                    transform: value >= 0.5 ? `rotate(-${(1 - (value - 0.5) / 0.5) * 180}deg)` : "none",
                  }
                : null),
            },
            CircularRight: {
              transform: !props.indeterminate && value <= 0.5 ? `rotate(-${(1 - value / 0.5) * 180}deg)` : undefined,
            },
          };
      }
    }, [finalProps.value, props.circular, props.indeterminate]);

    return (
      <Root
        {...NodeDataProps({
          'disabled': !!props.disabled,
          'circular': !!props.circular,
          'indeterminate': !!props.indeterminate,
        })}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamp(Math.round(finalProps.value * 100), 0, 100)}
        aria-valuetext={toPercentage(finalProps.value)}
      >
        <Container>
          {!props.circular ? (
            <BarFill style={{ ...styles.BarFill }} />
          ) : (
            <CircularWrapper>
              <CircularBackground />
              <CircularLeftWrapper>
                <CircularLeft style={{ ...styles.CircularLeft }} />
              </CircularLeftWrapper>
              <CircularRightWrapper>
                <CircularRight style={{ ...styles.CircularRight }} />
              </CircularRightWrapper>
            </CircularWrapper>
          )}
        </Container>
      </Root>
    );
  }
);

export type ProgressBarProps = UUIFunctionComponentProps<typeof ProgressBar>;

const toPercentage = (n: number) => `${(n * 100).toFixed(4)}%`;
