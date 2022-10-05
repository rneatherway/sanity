import {SchemaType} from '@sanity/types'
import React, {useCallback, createElement} from 'react'
import {PreviewProps} from '../../components/previews'
import {
  defaultResolveInputComponent,
  defaultResolveFieldComponent,
  defaultResolveItemComponent,
  defaultResolvePreviewComponent,
} from '../studio/inputResolver/inputResolver'
import {InputProps, FieldProps, ItemProps} from '../types'

function useResolveDefaultComponent<T extends {schemaType?: SchemaType}>(props: {
  componentProps: Omit<T, 'renderDefault'>
  componentResolver: (schemaType: SchemaType) => React.ComponentType<Omit<T, 'renderDefault'>>
}): React.ReactElement<T> {
  const {componentResolver, componentProps} = props

  // NOTE: this will not happen, but we do this to avoid updating too many places
  // TODO: We need to clean up the preview machinery + types to remove this
  if (!componentProps.schemaType) {
    throw new Error('the `schemaType` property must be defined')
  }

  const defaultResolvedComponent = componentResolver(componentProps.schemaType)

  const renderDefault = useCallback(
    (parentTypeProps: T) => {
      if (!componentProps.schemaType?.type) {
        // In theory this should not be possible, and this error should never be thrown
        throw new Error('Attempted to render form component of non-existent parent type')
      }

      // The components property is removed from the schemaType object
      // in order to prevent that a component is render itself
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {components, ...restSchemaType} = componentProps.schemaType
      const parentTypeResolvedComponent = componentResolver(restSchemaType as SchemaType)
      return createElement(parentTypeResolvedComponent, parentTypeProps)
    },
    [componentProps.schemaType, componentResolver]
  )

  return createElement(defaultResolvedComponent, {
    ...componentProps,
    renderDefault,
  }) as React.ReactElement<T>
}

/**
 * @internal
 */
export function DefaultInput(props: Omit<InputProps, 'renderDefault'>): React.ReactElement {
  return useResolveDefaultComponent<Omit<InputProps, 'renderDefault'>>({
    componentProps: props,
    componentResolver: defaultResolveInputComponent,
  })
}

/**
 * @internal
 */
export function DefaultField(props: Omit<FieldProps, 'renderDefault'>): React.ReactElement {
  return useResolveDefaultComponent<Omit<FieldProps, 'renderDefault'>>({
    componentProps: props,
    componentResolver: defaultResolveFieldComponent,
  })
}

/**
 * @internal
 */
export function DefaultItem(props: Omit<ItemProps, 'renderDefault'>): React.ReactElement {
  return useResolveDefaultComponent<Omit<ItemProps, 'renderDefault'>>({
    componentProps: props,
    componentResolver: defaultResolveItemComponent,
  })
}

/**
 * @internal
 */
export function DefaultPreview(props: Omit<PreviewProps, 'renderDefault'>): React.ReactElement {
  return useResolveDefaultComponent<Omit<PreviewProps, 'renderDefault'>>({
    componentProps: props,
    componentResolver: defaultResolvePreviewComponent,
  })
}
