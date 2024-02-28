import parse from 'html-react-parser';

export const RichContent: React.FC<{content: string}> = ({content}) => {
  return (
    <div className="rich-content">
      {parse(content)}
    </div>
  )
}
