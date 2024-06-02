interface MessageProps {
    message: string | any[]
    success: boolean
    close: () => void
}

export const Message = ({ message, success, close}: MessageProps) => {
    const formatText = (text: any[]) => {
        let errorString = ''
        text.map((err:any) => (
          errorString+=err.msg+"\n"
        ))

        const lines = errorString.split('\n');
        
        if (lines.length === 1) {
          // Simple phrase, no bullet points needed
          return <p className="text-sm">{text}</p>;
        }
        
        // Complex text with multiple lines
        return (
          <ul>
            {lines.map((line, index) => {
              return (
                <li className="text-sm" key={index}>
                  {line}
                </li>
              );
            })}
          </ul>
        );
      };

    return (
        <div
        className={`rounded-xl ${success ? 'bg-green-300' : 'bg-red-300'} py-2 px-3 w-full flex justify-between items-start`}>
            {message !== "" && 
            <>
            {Array.isArray(message) ? formatText(message) : message}
            <button onClick={close} className={`transition-all duration-150 text-sm  ${success ? 'hover:text-green-600' : 'hover:text-red-600'}`}>x</button>
            </>}
        </div>
    );
  }
  
export default Message;
  