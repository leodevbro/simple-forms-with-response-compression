'use client';
import {
  allNewLines,
  checkValidityOfResponseCode,
  generateNiceCodeFromFilling,
} from '@/utils/main';
import styled from 'styled-components';

import { IBM_Plex_Mono_using } from '@/app/globalStyles';
import { CSSProperties, useMemo, useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';

import { CopyButton } from '@/components/mini/CopyButton';
import { MAX_COUNT_OF_QUESTIONS } from '@/utils/constants';

const responseCodeStyle: CSSProperties = {
  ...IBM_Plex_Mono_using.style,
  fontSize: `14px`,
  fontWeight: `bold`,
  fontStyle: `normal`,
  paddingLeft: `10px`,
  paddingRight: `10px`,
};

const Ground = styled.div`
  //
`;

const ResponseCodeWrap = styled.div`
  position: relative;
  max-width: 100%;
  display: flex;
  justify-content: center;

  align-items: center;
  flex-wrap: nowrap;
  column-gap: 4px;
`;

const ResponseCode = styled.div`
  position: relative;
  /* margin-left: auto;
  margin-right: auto; */
  /* font-size: 14px; */

  flex-shrink: 1;

  padding: 6px;
  /* margin: 6px; */
  /* margin-bottom: 6px; */

  display: inline-block;

  border-radius: 6px;
  background-image: linear-gradient(90deg, #00ff1532, #00ffb334);

  &:hover {
    /* cursor: pointer; */
    /* background-image: linear-gradient(90deg, #00ff6a40, #00ff6a2b); */
  }

  &:active {
    /* background-image: linear-gradient(90deg, #00ff6a9b, #00ff6a75); */
  }
`;

const DiffTextarea = styled.textarea`
  background-color: transparent;
  resize: none;

  overflow-wrap: anywhere;

  border: none;
  outline: none;

  padding: 6px;
  border-radius: 6px;
  background-image: linear-gradient(90deg, #ffc40075, #5eff0065);

  overflow-x: auto;
  white-space: pre-wrap;

  flex-shrink: 0;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;

  &.diffValError {
    outline: 2px solid red;
  }
`;

export const NiceCodesArea = ({
  fillingOfTheForm,
}: {
  fillingOfTheForm: nsFormMin.Filling;
}) => {
  // const responseCode_ref = useRef<HTMLDivElement | null>(null);
  const diffTextarea_ref = useRef<HTMLTextAreaElement | null>(null);

  const {
    width: widthOfResponseCode,
    // height: heightOfResponseCode,
    ref: responseCode_ref,
  } = useResizeObserver<HTMLDivElement>({
    box: 'border-box',

    onResize: (size) => {
      // console.log(size);
      if (typeof size.width !== 'number') {
        return;
        // throw new Error(`widthOfResponseCode is not a number`);
      }

      if (typeof size.height !== 'number') {
        return;
        // throw new Error(`heightOfResponseCode is not a number`);
      }

      if (!diffTextarea_ref.current) {
        throw new Error(`diffTextarea_ref.current is falsy --- onResize`);
      }

      const widthOfTheCodeEl_str = `${size.width}px`;
      const heightOfTheCodeEl_str = `${size.height}px`;

      diffTextarea_ref.current.style.width = widthOfTheCodeEl_str;
      diffTextarea_ref.current.style.height = heightOfTheCodeEl_str;
    },
  });

  const niceCodeOfResponse = useMemo(() => {
    return generateNiceCodeFromFilling(fillingOfTheForm);
  }, [fillingOfTheForm]);

  const [diffVal, setDiffVal] = useState<string>('');

  const [diffValError, setDiffValError] = useState<false | string>(false);

  return (
    <Ground>
      {/* <div>დააჭირეთ კოდს რომ დაკოპირდეს</div> */}
      <ResponseCodeWrap>
        <ResponseCode ref={responseCode_ref} style={responseCodeStyle}>
          {niceCodeOfResponse.myJsx}
        </ResponseCode>

        <CopyButton textToCopy={niceCodeOfResponse.text} />
      </ResponseCodeWrap>

      <div style={{ height: 6 }} />

      <ResponseCodeWrap>
        <DiffTextarea
          className={diffValError ? 'diffValError' : ''}
          ref={diffTextarea_ref}
          // type="text"
          value={diffVal}
          onChange={(e) => {
            const candVal = e.target.value;

            for (const nl of allNewLines) {
              if (candVal.includes(nl)) {
                return;
              }
            }

            if (candVal.length > MAX_COUNT_OF_QUESTIONS * 10) {
              alert(`too long text`);
              return;
            }

            const inpCodeToArr = checkValidityOfResponseCode(candVal);

            setDiffVal(candVal);

            if (!inpCodeToArr) {
              setDiffValError('error');
            } else {
              setDiffValError(false);
            }
          }}
          style={responseCodeStyle}
          placeholder="სხვისი კოდი შესადარებლად"
        />

        <CopyButton textToCopy={diffVal} />
      </ResponseCodeWrap>
      {/* <div>ჩასვით სხვისი კოდი შესადარებლად</div> */}
    </Ground>
  );
};
