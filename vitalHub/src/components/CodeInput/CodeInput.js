import React, { useState } from 'react'


import { CodeField, useBlurOnFulfill, useClearByFocusCell, Cursor } from 'react-native-confirmation-code-field'

import { StyleSheet } from 'react-native';
import { CodeText, CodeView } from './StyleCodeInput';

const CELL_COUNT = 4;

export default function CodeInput({ value, setValue }) {
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

    return (
        <CodeView>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                autoFocus={true}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={codeFieldStyle}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                    <CodeText
                        key={index}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        {symbol || (isFocused ? <Cursor/> : null)}
                    </CodeText>
                )}
            />
        </CodeView>
    )
}

const codeFieldStyle = StyleSheet.create({
    gap: 20
});