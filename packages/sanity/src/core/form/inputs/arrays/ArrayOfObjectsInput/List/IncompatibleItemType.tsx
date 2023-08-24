import {Box, Card, Code, Flex, Popover, Stack, Text, Theme, useClickOutside} from '@sanity/ui'
import React, {useCallback} from 'react'
import {BulbOutlineIcon, UnknownIcon} from '@sanity/icons'
import {resolveTypeName} from '@sanity/util/content'
import styled from 'styled-components'
import {Trans} from 'react-i18next'
import {useTranslation} from '../../../../../i18n'

const PopoverCard = styled(Card)`
  max-width: ${({theme}: {theme: Theme}) => theme.sanity.container[1]}px;
`

interface Props {
  value: unknown
  onFocus?: (event: React.FocusEvent) => void
  vertical?: boolean
}

export function IncompatibleItemType(props: Props) {
  const {value, onFocus, vertical, ...rest} = props
  const [showDetails, setShowDetails] = React.useState(false)
  const [popoverRef, setPopoverRef] = React.useState<HTMLElement | null>(null)

  const {t} = useTranslation()

  useClickOutside(() => setShowDetails(false), [popoverRef])

  const handleKeyDown = React.useCallback((e: any) => {
    if (e.key === 'Escape' || e.key === 'Tab') {
      setShowDetails(false)
    }
  }, [])

  const handleShowDetails = useCallback(() => {
    setShowDetails((v) => !v)
  }, [])

  const typeName = resolveTypeName(value)
  return (
    <Popover
      open={showDetails}
      ref={setPopoverRef}
      onKeyDown={handleKeyDown}
      portal
      constrainSize
      tone="default"
      content={
        <PopoverCard margin={1} padding={3} onKeyDown={handleKeyDown} tabIndex={0} overflow="auto">
          <Stack space={4}>
            <Box>
              <Text weight="semibold">{t('inputs.array.error.type-is-incompatible-title')}</Text>
            </Box>
            <Text size={1}>
              <Trans
                t={t}
                i18nKey="inputs.array.error.current-schema-not-declare-description"
                components={[<code key={0}>{typeName}</code>]}
                values={{typeName: typeName}}
              />
            </Text>
            <Box>
              <Text size={1}>
                <BulbOutlineIcon /> {t('inputs.array.error.can-delete-but-no-edit-description')}
              </Text>
            </Box>
            <Stack space={2}>
              <Text size={1} weight="semibold">
                {t('inputs.array.error.json-representation-description')}
              </Text>
              <Card padding={2} overflow="auto" border>
                <Code size={1} as="pre" language="json">
                  {JSON.stringify(value, null, 2)}
                </Code>
              </Card>
            </Stack>
          </Stack>
        </PopoverCard>
      }
    >
      <Card
        as="button"
        type="button"
        radius={2}
        tone="inherit"
        paddingX={2}
        paddingY={3}
        flex={1}
        onFocus={onFocus}
        onClick={handleShowDetails}
        onKeyDown={handleKeyDown}
        __unstable_focusRing
        {...rest}
      >
        <Flex align="center">
          <Box marginRight={3}>
            <Text>
              <UnknownIcon />
            </Text>
          </Box>

          <Box flex={1}>
            <Text size={1} textOverflow="ellipsis">
              <Trans
                t={t}
                i18nKey="inputs.array.error.type-is-incompatible-prompt"
                components={[<code key={0}>{typeName}</code>]}
                values={{typeName: typeName}}
              />
            </Text>
          </Box>
        </Flex>
      </Card>
    </Popover>
  )
}
