interface Props {
  content?: string;
  children: React.ReactNode;
}
export const CommonTooltip: React.FC<Props> = ({children}) => {
  return (<>{children}</>)
}
