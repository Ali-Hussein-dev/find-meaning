import { DefExm } from '@/components/index';
import { TiGroup, TiUser } from 'react-icons/ti';
import { CC } from './CC';
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
        <div className="mb-2 border-b border-lightBlue-100">
          <h3 className="font-bold text-lightBlue-300">{partOfSpeech}</h3>
          {senses.map((o, i) => (
            <DefExm
              key={i}
              def={o.definition}
              exm={o.usageExamples}
              context={o.context?.domains}
            />
          ))}
          <CC
            isTrue={lexeme?.forms?.length > 0}
            className="flex items-center px-1 py-1 mb-1 border rounded gap-x-2 bg-trueGray-100"
          >
            <span className="font-bold text-trueGray-400">Forms:</span>
            <span className="flex items-center gap-x-1">
              <TiUser className="text-trueGray-400" />
              {lexeme?.lemma}
            </span>
            <CC
              isTrue={lexeme?.forms?.[0]?.form}
              className="flex items-center gap-x-1"
            >
              <TiGroup className="text-trueGray-400" />
              {lexeme?.forms?.[0]?.form}
            </CC>
          </CC>
        </div>
      );
    case 'verb':
      return (
        <div className="mb-2 border-b border-lightBlue-100">
          <h3 className="font-bold text-lightBlue-300">{partOfSpeech}</h3>
          {senses.map((o, i) => (
            <DefExm key={i} def={o.definition} exm={o.usageExamples} />
          ))}
        </div>
      );
    case 'adjective':
      return (
        <div className="mb-2 border-b border-blueGray-100">
          <h3 className="font-bold text-lightBlue-300">{partOfSpeech}</h3>
          {senses.map((o, i) => (
            <DefExm key={i} def={o.definition} exm={o.usageExamples} />
          ))}
          <CC
            isTrue={lexeme?.forms?.length > 0}
            className="flex items-center px-1 py-1 mb-1 border rounded gap-x-2 bg-trueGray-100"
          >
            <span className="font-bold text-trueGray-400">Forms:</span>
            {lexeme.forms?.map((o, i) => (
              <CC key={i} isTrue={o.form}>
                {o.form}
              </CC>
            ))}
          </CC>
        </div>
      );
    default:
      return (
        <div className="mb-2 border-b border-lightBlue-100">
          <h3 className="font-bold text-lightBlue-300">{partOfSpeech}</h3>
          {senses.map((o, i) => (
            <DefExm key={i} def={o.definition} exm={o.usageExamples} />
          ))}
        </div>
      );
  }
};
