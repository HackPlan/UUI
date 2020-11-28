import React from 'react';

import { UUIComponentNames } from './components/UUIComponentNames';
import type { AccordionProps } from './components/Accordion/Accordion';
import type { AccordionPaneProps } from './components/Accordion/AccordionPane';
import type { BreadcrumbProps } from './components/Breadcrumb/Breadcrumb';
import type { ButtonProps } from './components/Button/Button';
import type { CascaderProps } from './components/Cascader/Cascader';
import type { CheckboxProps } from './components/Checkbox/Checkbox';
import type { CollapseProps } from './components/Collapse/Collapse';
import type { DatePickerProps } from './components/DatePicker/DatePicker';
import type { DialogProps } from './components/Dialog/Dialog';
import type { DrawerProps } from './components/Drawer/Drawer';
import type { IconProps } from './components/Icon/Icon';
import type { TextFieldProps } from './components/Input/TextField';
import type { NumberFieldProps } from './components/Input/NumberField';
import type { TextAreaProps } from './components/Input/TextArea';
import type { CountdownLabelProps } from './components/Label/CountdownLabel';
import type { DateLabelProps } from './components/Label/DateLabel';
import type { MoneyLabelProps } from './components/Label/MoneyLabel';
import type { NumberAbbrLabelProps } from './components/Label/NumberAbbrLabel';
import type { TimeLabelProps } from './components/Label/TimeLabel';
import type { LayoutProps } from './components/Layout/Layout';
import type { LayoutAsideProps } from './components/Layout/LayoutAside';
import type { LayoutFooterProps } from './components/Layout/LayoutFooter';
import type { LayoutHeaderProps } from './components/Layout/LayoutHeader';
import type { LayoutMainProps } from './components/Layout/LayoutMain';
import type { LayoutNavProps } from './components/Layout/LayoutNav';
import type { ListBoxProps } from './components/ListBox/ListBox';
import type { LoadingCoverProps } from './components/Loading/LoadingCover';
import type { LoadingSpinnerProps } from './components/Loading/LoadingSpinner';
import type { PageProps } from './components/Page/Page';
import type { PageAnnotatedSectionProps } from './components/Page/PageAnnotatedSection';
import type { PageSectionProps } from './components/Page/PageSection';
import type { PaginationProps } from './components/Pagination/Pagination';
import type { PageInfoProps } from './components/Pagination/PageInfo';
import type { PageJumperProps } from './components/Pagination/PageJumper';
import type { PageListProps } from './components/Pagination/PageList';
import type { PageNextButtonProps } from './components/Pagination/PageNextButton';
import type { PagePrevButtonProps } from './components/Pagination/PagePrevButton';
import type { PageSelectorProps } from './components/Pagination/PageSelector';
import type { PageSizeProps } from './components/Pagination/PageSize';
import type { PopoverProps } from './components/Popover/Popover';
import type { ProgressBarProps } from './components/ProgressBar/ProgressBar';
import type { RadioProps } from './components/Radio/Radio';
import type { RadioGroupProps } from './components/Radio/RadioGroup';
import type { SegmentControlProps } from './components/SegmentControl/SegmentControl';
import type { HTMLSelectProps } from './components/Select/HTMLSelect';
import type { SelectProps } from './components/Select/Select';
import type { SkeletonProps } from './components/Skeleton/Skeleton';
import type { SkeletonParagraphProps } from './components/Skeleton/Paragraph';
import type { SkeletonPictureProps } from './components/Skeleton/Picture';
import type { SkeletonTitleProps } from './components/Skeleton/Title';
import type { SliderProps } from './components/Slider/Slider';
import type { StepperProps } from './components/Stepper/Stepper';
import type { SwitchProps } from './components/Switch/Switch';
import type { TableProps } from './components/Table/Table';
import type { TabsProps } from './components/Tabs/Tabs';
import type { TabProps } from './components/Tabs/Tab';
import type { TagProps } from './components/Tag/Tag';
import type { ToastProps } from './components/Toast/Toast';
import type { ToasterProps } from './components/Toast/Toaster';


export interface UUIProviderCustomize {
  [UUIComponentNames.Accordion]?: AccordionProps['customize'];
  [UUIComponentNames.AccordionPane]?: AccordionPaneProps['customize'];
  [UUIComponentNames.Breadcrumb]?: BreadcrumbProps['customize'];
  [UUIComponentNames.Button]?: ButtonProps['customize'];
  [UUIComponentNames.Cascader]?: CascaderProps['customize'];
  [UUIComponentNames.Checkbox]?: CheckboxProps['customize'];
  [UUIComponentNames.Collapse]?: CollapseProps['customize'];
  [UUIComponentNames.DatePicker]?: DatePickerProps['customize'];
  [UUIComponentNames.Dialog]?: DialogProps['customize'];
  [UUIComponentNames.Drawer]?: DrawerProps['customize'];
  [UUIComponentNames.Icon]?: IconProps['customize'];
  [UUIComponentNames.TextField]?: TextFieldProps['customize'];
  [UUIComponentNames.NumberField]?: NumberFieldProps['customize'];
  [UUIComponentNames.TextArea]?: TextAreaProps['customize'];
  [UUIComponentNames.CountdownLabel]?: CountdownLabelProps['customize'];
  [UUIComponentNames.DateLabel]?: DateLabelProps['customize'];
  [UUIComponentNames.MoneyLabel]?: MoneyLabelProps['customize'];
  [UUIComponentNames.NumberAbbrLabel]?: NumberAbbrLabelProps['customize'];
  [UUIComponentNames.TimeLabel]?: TimeLabelProps['customize'];
  [UUIComponentNames.Layout]?: LayoutProps['customize'];
  [UUIComponentNames.LayoutAside]?: LayoutAsideProps['customize'];
  [UUIComponentNames.LayoutFooter]?: LayoutFooterProps['customize'];
  [UUIComponentNames.LayoutHeader]?: LayoutHeaderProps['customize'];
  [UUIComponentNames.LayoutMain]?: LayoutMainProps['customize'];
  [UUIComponentNames.LayoutNav]?: LayoutNavProps['customize'];
  [UUIComponentNames.ListBox]?: ListBoxProps['customize'];
  [UUIComponentNames.LoadingCover]?: LoadingCoverProps['customize'];
  [UUIComponentNames.LoadingSpinner]?: LoadingSpinnerProps['customize'];
  [UUIComponentNames.Page]?: PageProps['customize'];
  [UUIComponentNames.PageAnnotatedSection]?: PageAnnotatedSectionProps['customize'];
  [UUIComponentNames.PageSection]?: PageSectionProps['customize'];
  [UUIComponentNames.Pagination]?: PaginationProps['customize'];
  [UUIComponentNames.PageInfo]?: PageInfoProps['customize'];
  [UUIComponentNames.PageJumper]?: PageJumperProps['customize'];
  [UUIComponentNames.PageList]?: PageListProps['customize'];
  [UUIComponentNames.PageNextButton]?: PageNextButtonProps['customize'];
  [UUIComponentNames.PagePrevButton]?: PagePrevButtonProps['customize'];
  [UUIComponentNames.PageSelector]?: PageSelectorProps['customize'];
  [UUIComponentNames.PageSize]?: PageSizeProps['customize'];
  [UUIComponentNames.Popover]?: PopoverProps['customize'];
  [UUIComponentNames.ProgressBar]?: ProgressBarProps['customize'];
  [UUIComponentNames.Radio]?: RadioProps['customize'];
  [UUIComponentNames.RadioGroup]?: RadioGroupProps['customize'];
  [UUIComponentNames.SegmentControl]?: SegmentControlProps['customize'];
  [UUIComponentNames.HTMLSelect]?: HTMLSelectProps['customize'];
  [UUIComponentNames.Select]?: SelectProps['customize'];
  [UUIComponentNames.Skeleton]?: SkeletonProps['customize'];
  [UUIComponentNames.SkeletonParagraph]?: SkeletonParagraphProps['customize'];
  [UUIComponentNames.SkeletonPicture]?: SkeletonPictureProps['customize'];
  [UUIComponentNames.SkeletonTitle]?: SkeletonTitleProps['customize'];
  [UUIComponentNames.Slider]?: SliderProps['customize'];
  [UUIComponentNames.Stepper]?: StepperProps['customize'];
  [UUIComponentNames.Switch]?: SwitchProps['customize'];
  [UUIComponentNames.Table]?: TableProps['customize'];
  [UUIComponentNames.Tabs]?: TabsProps['customize'];
  [UUIComponentNames.Tab]?: TabProps['customize'];
  [UUIComponentNames.Tag]?: TagProps['customize'];
  [UUIComponentNames.Toast]?: ToastProps['customize'];
  [UUIComponentNames.Toaster]?: ToasterProps['customize'];
}

export type UUIProviderExtraCustomizeT = { [key: string]: any }

export interface UUIProviderContextValue<C extends UUIProviderExtraCustomizeT> {
  customize?: C & UUIProviderCustomize;
}
export const UUIProviderContext = React.createContext<UUIProviderContextValue<any> | null>(null)

export interface UUIProviderProps<C extends UUIProviderExtraCustomizeT> extends UUIProviderContextValue<C> {
  children: React.ReactNode;
}
export function UUIProvider<C extends UUIProviderExtraCustomizeT>(props: UUIProviderProps<C>) {
  return (
    <UUIProviderContext.Provider value={{
      customize: props.customize
    }}>
      {props.children}
    </UUIProviderContext.Provider>
  );
}
