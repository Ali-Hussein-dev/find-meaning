export const HighlightSubstring: React.FC<{
  inputValue: string;
  suggestion: string;
}> = ({ inputValue, suggestion }) => {
  inputValue = inputValue.trim().toLowerCase();
  const splitSuggestion = suggestion
    .replace(inputValue, `${inputValue},`)
    .split(',');
  return (
    <span>
      <span className="text-lightBlue-400">{splitSuggestion[0]}</span>
      <span>{splitSuggestion[1]}</span>
    </span>
  );
};
