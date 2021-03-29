import { DefExm } from '@/components/index';
import { TiGroup, TiUser } from 'react-icons/ti';
import { CondComp } from '@/components/index';
// interface Sense {
//   definition: string;
//   usageExamples?: string | string[];
//   labels?: any[];
//   synonyms?: string[];
//   context: { domains: string[] };
// }
export interface wordForm {
  form: string;
  grammar: { tense: string; verbForm: string }[];
}
export interface Lexeme {
  lemma: string;
  partOfSpeech: string;
  senses: any[];
  forms: any[];
  synonymSets: any[];
}
const FormsContainer: React.FC<{ baseCond: boolean }> = ({
  baseCond,
  children,
}) => (
  <CondComp
    baseCond={baseCond}
    className="flex px-1 py-1 mb-1 rounded xxs:flex-col bg-trueGray-100 gap-x-2"
  >
    <span className="font-bold text-trueGray-400">Forms:</span>
    <span className="flex flex-wrap items-center gap-x-4 xxs:text-sm">
      {children}
    </span>
  </CondComp>
);
const LexemeContainer: React.FC<{ partOfSpeech: string; children: any }> = ({
  children,
  partOfSpeech,
}) => {
  return (
    <div className="mb-2 border-b border-blueGray-300">
      <h3 className="font-bold text-lightBlue-300"> {partOfSpeech}</h3>
      {children}
    </div>
  );
};

//=======================
export const WikiLexeme: React.FC<{
  lexeme: Lexeme;
}> = ({ lexeme }) => {
  // hooks
  //--------------------------------------
  // functions
  const { partOfSpeech, senses } = lexeme;
  if (senses.length > 3) {
    senses.length = 3;
  }
  //--------------------------------------
  switch (partOfSpeech) {
    case 'noun':
      return (
        <LexemeContainer partOfSpeech={partOfSpeech}>
          {senses.map((o, i) => (
            <DefExm
              key={i}
              def={o.definition}
              exm={o.usageExamples}
              context={o.context?.domains}
            />
          ))}
          <FormsContainer baseCond={lexeme?.forms?.length > 0}>
            <span className="flex items-center gap-x-1">
              <TiUser className="text-trueGray-400" />
              {lexeme?.lemma}
            </span>
            <CondComp
              baseCond={lexeme?.forms?.[0]?.form}
              className="flex items-center gap-x-1"
            >
              <TiGroup className="text-trueGray-400" />
              {lexeme?.forms?.[0]?.form}
            </CondComp>
          </FormsContainer>
        </LexemeContainer>
      );
    case 'verb':
      return (
        <LexemeContainer partOfSpeech={partOfSpeech}>
          {senses.map((o, i) => (
            <DefExm key={i} def={o.definition} exm={o.usageExamples} />
          ))}
        </LexemeContainer>
      );
    case 'adjective':
      return (
        <div className="mb-2 border-b border-blueGray-300">
          <h3 className="font-bold text-lightBlue-300">{partOfSpeech}</h3>
          <>
            {senses.map((o, i) => (
              <DefExm key={i} def={o.definition} exm={o.usageExamples} />
            ))}
          </>
          <FormsContainer baseCond={lexeme?.forms?.length > 0}>
            {lexeme.forms?.map((o, i) => (
              <CondComp key={i} baseCond={!!o.form}>
                {o.form}
              </CondComp>
            ))}
          </FormsContainer>
        </div>
      );
    default:
      return (
        <LexemeContainer partOfSpeech={partOfSpeech}>
          {senses.map((o, i) => (
            <DefExm key={i} def={o.definition} exm={o.usageExamples} />
          ))}
        </LexemeContainer>
      );
  }
};
