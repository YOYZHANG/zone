interface Props {
  content: string;
  children: React.ReactNode;
}
export const CommonTooltip: React.FC<Props> = ({content, children}) => {
  return (<>{children}</>)
}
