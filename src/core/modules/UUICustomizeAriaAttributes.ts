import { AriaAttributes } from "react";

export interface UUICustomizeAriaAttributes {
  /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
  'activedescendant'?: Required<AriaAttributes>['aria-activedescendant'];
  /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
  'atomic'?: Required<AriaAttributes>['aria-atomic'];
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
   * presented if they are made.
   */
  'autocomplete'?: Required<AriaAttributes>['aria-autocomplete'];
  /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
  'busy'?: Required<AriaAttributes>['aria-busy'];
  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * @see aria-pressed @see aria-selected.
   */
  'checked'?: Required<AriaAttributes>['aria-checked'];
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  'colcount'?: Required<AriaAttributes>['aria-colcount'];
  /**
   * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  'colindex'?: Required<AriaAttributes>['aria-colindex'];
  /**
   * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  'colspan'?: Required<AriaAttributes>['aria-colspan'];
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   * @see aria-owns.
   */
  'controls'?: Required<AriaAttributes>['aria-controls'];
  /** Indicates the element that represents the current item within a container or set of related elements. */
  'current'?: Required<AriaAttributes>['aria-current'];
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  'describedby'?: Required<AriaAttributes>['aria-describedby'];
  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  'details'?: Required<AriaAttributes>['aria-details'];
  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   * @see aria-hidden @see aria-readonly.
   */
  'disabled'?: Required<AriaAttributes>['aria-disabled'];
  /**
   * Indicates what functions can be performed when a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  'dropeffect'?: Required<AriaAttributes>['aria-dropeffect'];
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  'errormessage'?: Required<AriaAttributes>['aria-errormessage'];
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  'expanded'?: Required<AriaAttributes>['aria-expanded'];
  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   */
  'flowto'?: Required<AriaAttributes>['aria-flowto'];
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  'grabbed'?: Required<AriaAttributes>['aria-grabbed'];
  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  'haspopup'?: Required<AriaAttributes>['aria-haspopup'];
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  'hidden'?: Required<AriaAttributes>['aria-hidden'];
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  'invalid'?: Required<AriaAttributes>['aria-invalid'];
  /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
  'keyshortcuts'?: Required<AriaAttributes>['aria-keyshortcuts'];
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  'label'?: Required<AriaAttributes>['aria-label'];
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  'labelledby'?: Required<AriaAttributes>['aria-labelledby'];
  /** Defines the hierarchical level of an element within a structure. */
  'level'?: Required<AriaAttributes>['aria-level'];
  /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
  'live'?: Required<AriaAttributes>['aria-live'];
  /** Indicates whether an element is modal when displayed. */
  'modal'?: Required<AriaAttributes>['aria-modal'];
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  'multiline'?: Required<AriaAttributes>['aria-multiline'];
  /** Indicates that the user may select more than one item from the current selectable descendants. */
  'multiselectable'?: Required<AriaAttributes>['aria-multiselectable'];
  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  'orientation'?: Required<AriaAttributes>['aria-orientation'];
  /**
   * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
   * @see aria-controls.
   */
  'owns'?: Required<AriaAttributes>['aria-owns'];
  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of the expected format.
   */
  'placeholder'?: Required<AriaAttributes>['aria-placeholder'];
  /**
   * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-setsize.
   */
  'posinset'?: Required<AriaAttributes>['aria-posinset'];
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked @see aria-selected.
   */
  'pressed'?: Required<AriaAttributes>['aria-pressed'];
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  'readonly'?: Required<AriaAttributes>['aria-readonly'];
  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  'relevant'?: Required<AriaAttributes>['aria-relevant'];
  /** Indicates that user input is required on the element before a form may be submitted. */
  'required'?: Required<AriaAttributes>['aria-required'];
  /** Defines a human-readable, author-localized description for the role of an element. */
  'roledescription'?: Required<AriaAttributes>['aria-roledescription'];
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  'rowcount'?: Required<AriaAttributes>['aria-rowcount'];
  /**
   * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount @see aria-rowspan.
   */
  'rowindex'?: Required<AriaAttributes>['aria-rowindex'];
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex @see aria-colspan.
   */
  'rowspan'?: Required<AriaAttributes>['aria-rowspan'];
  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked @see aria-pressed.
   */
  'selected'?: Required<AriaAttributes>['aria-selected'];
  /**
   * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-posinset.
   */
  'setsize'?: Required<AriaAttributes>['aria-setsize'];
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  'sort'?: Required<AriaAttributes>['aria-sort'];
  /** Defines the maximum allowed value for a range widget. */
  'valuemax'?: Required<AriaAttributes>['aria-valuemax'];
  /** Defines the minimum allowed value for a range widget. */
  'valuemin'?: Required<AriaAttributes>['aria-valuemin'];
  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  'valuenow'?: Required<AriaAttributes>['aria-valuenow'];
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  'valuetext'?: Required<AriaAttributes>['aria-valuetext'];
}