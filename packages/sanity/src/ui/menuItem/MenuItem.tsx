import {
  Flex,
  MenuItem as UIMenuItem,
  MenuItemProps as UIMenuItemProps,
  Text,
  Badge,
  Stack,
  Hotkeys,
} from '@sanity/ui'
import React, {createElement, forwardRef, isValidElement, useMemo} from 'react'
import {isValidElementType} from 'react-is'
import styled from 'styled-components'

const FONT_SIZE = 1

/** @internal */
export type MenuItemProps = Pick<
  UIMenuItemProps,
  'as' | 'icon' | 'iconRight' | 'pressed' | 'selected' | 'text' | 'tone'
> &
  Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'ref' | 'selected'> & {
    badge?: string
    hotkeys?: UIMenuItemProps['hotkeys']
    preview?: React.ReactNode
    subtitle?: string
    /**
     * Allows to add wrappers to the menu item, e.g. `Tooltip`.
     */
    renderMenuItem?: (menuItem: React.JSX.Element) => React.ReactNode
  }

const PreviewWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  height: 41px;
  justify-content: center;
  max-width: 41px;
  overflow: hidden;
`
/**
 * Studio UI <MenuItem>.
 *
 * Studio UI components are opinionated `@sanity/ui` components meant for internal use only.
 * Props and options are intentionally limited to ensure consistency and ease of use.
 *
 * @internal
 */
export const MenuItem = forwardRef(function MenuItem(
  {badge, icon, iconRight, hotkeys, preview = null, subtitle, text, ...props}: MenuItemProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const menuItemContent = useMemo(() => {
    return (
      <Flex gap={3} align="center">
        {icon && (
          <Text size={FONT_SIZE}>
            {isValidElement(icon) && icon}
            {isValidElementType(icon) && createElement(icon)}
          </Text>
        )}

        {preview && <PreviewWrapper>{preview}</PreviewWrapper>}

        {(text || subtitle) && (
          <Stack flex={1} space={2}>
            {text && (
              <Text size={FONT_SIZE} textOverflow="ellipsis" weight="medium">
                {text}
              </Text>
            )}
            {subtitle && (
              <Text size={FONT_SIZE} textOverflow="ellipsis" weight={'regular'} muted>
                {subtitle}
              </Text>
            )}
          </Stack>
        )}

        {hotkeys && (
          <Hotkeys fontSize={FONT_SIZE} keys={hotkeys} style={{marginTop: -4, marginBottom: -4}} />
        )}

        {badge && (
          <Badge fontSize={FONT_SIZE} mode="default" style={{marginTop: -4, marginBottom: -4}}>
            {badge}
          </Badge>
        )}

        {iconRight && (
          <Text size={FONT_SIZE}>
            {isValidElement(iconRight) && iconRight}
            {isValidElementType(iconRight) && createElement(iconRight)}
          </Text>
        )}
      </Flex>
    )
  }, [icon, preview, text, subtitle, hotkeys, badge, iconRight])

  return (
    <UIMenuItem ref={ref} {...props}>
      {typeof props.renderMenuItem === 'function'
        ? props.renderMenuItem(menuItemContent)
        : menuItemContent}
    </UIMenuItem>
  )
})
