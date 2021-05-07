import { AiTwotoneAppstore, AiTwotoneMinusSquare } from 'react-icons/ai';
import {
  DefExm,
  CondComp,
  ConjugatedForms,
  FormsContainer,
} from '@/components/index';
import { ConjugatedFormsT } from './ConjugatedForms';
import { Tooltip } from '@chakra-ui/react';
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

const LexemeContainer: React.FC<{ partOfSpeech: string; children: any }> = ({
  children,
  partOfSpeech,
}) => {
  return (
    <div className="mb-3 ">
      <h3 className="py-1 pl-3 mb-2 font-semibold bg-lightBlue-100 rounded-xl text-lightBlue-800 ">
        {partOfSpeech}
      </h3>
      {children}
    </div>
  );
};

//=======================
export const WikiLexeme: React.FC<{
  lexeme: Lexeme;
  conjugatedFormsData: ConjugatedFormsT;
}> = ({ lexeme, conjugatedFormsData }) => {
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
              <AiTwotoneMinusSquare className="text-blueGray-300" />

              <Tooltip hasArrow label="singular" aria-label="a tooltip">
                {lexeme?.lemma}
              </Tooltip>
            </span>
            <CondComp
              baseCond={lexeme?.forms?.[0]?.form}
              className="flex items-center gap-x-2"
            >
              <AiTwotoneAppstore className="text-blueGray-300" />
              <Tooltip hasArrow label="plural" aria-label="a tooltip">
                {lexeme?.forms?.[0]?.form}
              </Tooltip>
            </CondComp>
          </FormsContainer>
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
              <CondComp key={i} baseCond={!!o.form} className="flex gap-x-2">
                {o.form}
                {lexeme.forms.length - 1 > i ? (
                  <span className="text-blueGray-400">|</span>
                ) : null}
              </CondComp>
            ))}
          </FormsContainer>
        </LexemeContainer>
      );
    case 'verb':
      return (
        <LexemeContainer partOfSpeech={partOfSpeech}>
          {senses.map((o, i) => (
            <DefExm key={i} def={o.definition} exm={o.usageExamples} />
          ))}
          <FormsContainer baseCond={!!conjugatedFormsData}>
            <ConjugatedForms forms={conjugatedFormsData} />
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
