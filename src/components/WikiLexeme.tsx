import { DefExm } from '@/components/index';
import { AiTwotoneAppstore, AiTwotoneMinusSquare } from 'react-icons/ai';

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
    className="flex px-1 py-1 font-semibold rounded xxs:flex-col gap-x-2 bg-blueGray-100 text-blueGray-600"
  >
    <span className="font-light text-blueGray-600">Forms:</span>
    <span className="flex flex-wrap items-center gap-x-4 xxs:text-md">
      {children}
    </span>
  </CondComp>
);
const LexemeContainer: React.FC<{ partOfSpeech: string; children: any }> = ({
  children,
  partOfSpeech,
}) => {
  return (
    <div className="mb-5">
      <h3 className="text-xl font-bold text-lightBlue-600"> {partOfSpeech}</h3>
      {children}
    </div>
  );
};

//=======================
export const WikiLexeme: React.FC<{
  lexeme: Lexeme;
}> = ({ lexeme }) => {
  //--------------------------------------hooks
  const { partOfSpeech, senses } = lexeme;
  if (senses.length > 3) {
    senses.length = 3;
  }
  //--------------------------------------functions
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
              <AiTwotoneMinusSquare className="text-blueGray-400" />
              {lexeme?.lemma}
            </span>
            <CondComp
              baseCond={lexeme?.forms?.[0]?.form}
              className="flex items-center gap-x-2"
            >
              <AiTwotoneAppstore className="text-blueGray-400" />
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
        <LexemeContainer partOfSpeech={partOfSpeech}>
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
        </LexemeContainer>
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
