'use client';
import { generateNiceCodeFromFilling } from '@/utils/main';
import styled from 'styled-components';

import { IBM_Plex_Mono_using } from '@/app/globalStyles';
import { CSSProperties, useRef } from 'react';
import useResizeObserver from 'use-resize-observer';

import { CopyButton } from '@/components/mini/CopyButton';

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
  background-image: linear-gradient(90deg, #00ff1552, #00ffb347);

  &:hover {
    /* cursor: pointer; */
    /* background-image: linear-gradient(90deg, #00ff6a6f, #00ff6a47); */
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

  return (
    <Ground>
      {/* <div>დააჭირეთ კოდს რომ დაკოპირდეს</div> */}
      <ResponseCodeWrap>
        <ResponseCode ref={responseCode_ref} style={responseCodeStyle}>
          {generateNiceCodeFromFilling(fillingOfTheForm)}
        </ResponseCode>

        <CopyButton />
      </ResponseCodeWrap>

      <div style={{ height: 6 }} />

      <ResponseCodeWrap>
        <DiffTextarea
          ref={diffTextarea_ref}
          // type="text"

          style={responseCodeStyle}
          placeholder="სხვისი კოდი შესადარებლად"
        />

        <CopyButton />
      </ResponseCodeWrap>
      {/* <div>ჩასვით სხვისი კოდი შესადარებლად</div> */}
    </Ground>
  );
};
