interface Props {
  content: string;
  children: React.FC
}
export const CommonTooltip: React.FC<Props> = ({content}) => {
  return (<>CommonToolTip {content}</>)
}
