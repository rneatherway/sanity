/* eslint-disable i18next/no-literal-string,no-attribute-string-literals/no-attribute-string-literals */
import {Box, Dialog, Stack, Text} from '@sanity/ui'
import React from 'react'

export function InitialValueTemplateError({errors}: {errors: Error[]}) {
  return (
    <Dialog header="Initial value template error" id="initial-value-error-dialog" width={1}>
      <Box padding={4}>
        <Stack space={4}>
          <Text>Failed to load initial value templates:</Text>
          {errors.map((error: Error) => (
            <Text key={error.message}>
              <code>{error.message}</code>
            </Text>
          ))}
        </Stack>
      </Box>
    </Dialog>
  )
}
