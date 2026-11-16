import React from 'react'
import ReactDOM from 'react-dom'
import * as _jsx_runtime from 'react/jsx-runtime'

/**
 * 将 contentlayer 预编译好的 MDX 代码（body.code）求值为 React 组件。
 * 等价于 mdx-bundler 的 getMDXComponent / pliny 的 useMDXComponent。
 */
export function getMDXComponent(code: string, globals: Record<string, unknown> = {}) {
  const scope = { React, ReactDOM, _jsx_runtime, ...globals }
  // eslint-disable-next-line no-new-func
  const fn = new Function(...Object.keys(scope), code)
  return fn(...Object.values(scope)).default as React.ComponentType<{
    components?: Record<string, React.ComponentType<unknown>>
    [key: string]: unknown
  }>
}

export function useMDXComponent(code: string, globals: Record<string, unknown> = {}) {
  return React.useMemo(() => getMDXComponent(code, globals), [code, globals])
}

export function MDXLayoutRenderer({
  code,
  components,
  ...rest
}: {
  code: string
  components?: Record<string, React.ComponentType<unknown>>
  [key: string]: unknown
}) {
  const Mdx = useMDXComponent(code)
  return <Mdx components={components} {...rest} />
}
