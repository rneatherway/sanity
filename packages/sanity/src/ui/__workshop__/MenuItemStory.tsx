import {CheckmarkIcon, WarningOutlineIcon} from '@sanity/icons'
import {Avatar, Box, Card, Flex, Menu, Stack, Text} from '@sanity/ui'
import {useString} from '@sanity/ui-workshop'
import React from 'react'
import {MenuItem} from '../menuItem'

const HOTKEYS = ['Ctrl', 'Alt', 'P']
const AVATAR_INITIALS = 'A.W.'

export default function MenuItemStory() {
  const badge = useString('Badge', 'Badge', 'Props')
  const subtitle = useString('Subtitle', 'Subtitle', 'Props')
  const text = useString('Text', 'Text', 'Props')

  return (
    <Box padding={4}>
      <Stack space={5}>
        <Stack space={3}>
          <Text size={1} weight="medium">
            Simple usage with optional icons
          </Text>
          <Card border>
            <Menu>
              <MenuItem text={text} />
              <MenuItem hotkeys={HOTKEYS} text={text} />
              <MenuItem badge={badge} text={text} />
              <MenuItem iconRight={CheckmarkIcon} subtitle={subtitle} text={text} />
              <MenuItem badge={badge} iconRight={CheckmarkIcon} subtitle={subtitle} text={text} />
              <MenuItem icon={WarningOutlineIcon} iconRight={CheckmarkIcon} text={text} />
              <MenuItem
                icon={WarningOutlineIcon}
                iconRight={CheckmarkIcon}
                subtitle={subtitle}
                text={text}
              />
            </Menu>
          </Card>
        </Stack>

        <Stack space={3}>
          <Text size={1} weight="medium">
            With previews
          </Text>
          <Card border>
            <Menu>
              <MenuItem
                iconRight={CheckmarkIcon}
                preview={<Avatar initials={AVATAR_INITIALS} />}
                text={text}
              />
              <MenuItem
                badge={badge}
                iconRight={CheckmarkIcon}
                preview={<Avatar initials={AVATAR_INITIALS} />}
                subtitle={subtitle}
                text={text}
              />
            </Menu>
          </Card>
        </Stack>

        <Stack space={3}>
          <Stack space={2}>
            <Text size={1} weight="medium">
              Preview overflow examples
            </Text>
            <Text muted size={1}>
              Previews larger than 41px will be clipped
            </Text>
          </Stack>
          <Card border>
            <Menu>
              <MenuItem
                badge={badge}
                iconRight={CheckmarkIcon}
                preview={<Avatar initials={AVATAR_INITIALS} size={1} />}
                subtitle={subtitle}
                text={text}
              />
              <MenuItem
                badge={badge}
                iconRight={CheckmarkIcon}
                preview={<Avatar initials={AVATAR_INITIALS} size={2} />}
                subtitle={subtitle}
                text={text}
              />
              <MenuItem
                badge={badge}
                iconRight={CheckmarkIcon}
                preview={
                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      background: 'orangered',
                      height: '2000px',
                      width: '20px',
                    }}
                  />
                }
                subtitle={subtitle}
                text={text}
              />
              <MenuItem
                badge={badge}
                iconRight={CheckmarkIcon}
                preview={
                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      background: 'lime',
                      height: '2000px',
                      width: '2000px',
                    }}
                  />
                }
                subtitle={subtitle}
                text={text}
              />
            </Menu>
          </Card>
        </Stack>

        <Stack space={3}>
          <Stack space={2}>
            <Text size={1} weight="medium">
              All options
            </Text>
            <Text muted size={1}>
              Not recommended. Icons and previews should never be used together, similarly badges +
              hotkeys.
            </Text>
          </Stack>
          <Card border>
            <Menu>
              <MenuItem
                badge={badge}
                hotkeys={HOTKEYS}
                icon={WarningOutlineIcon}
                iconRight={CheckmarkIcon}
                preview={<Avatar initials={AVATAR_INITIALS} size={0} />}
                subtitle={subtitle}
                text={text}
              />
            </Menu>
          </Card>
        </Stack>
      </Stack>
    </Box>
  )
}
