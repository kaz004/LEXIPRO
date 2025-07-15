"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: { color: COLORS } }
const COLORS = {
  light: {
    grid: "hsl(214.3 31.6% 91.4%)",
    tooltip: "hsl(215 27.9% 16.9%)",
    axis: "hsl(215 27.9% 16.9%)",
    range: {
      "chart-1": "hsl(197.2 82.2% 60.4%)",
      "chart-2": "hsl(262.1 83.3% 57.8%)",
      "chart-3": "hsl(358.4 75.6% 50.9%)",
      "chart-4": "hsl(47.9 95.8% 53.1%)",
      "chart-5": "hsl(127.9 79.6% 50.9%)",
    },
  },
  dark: {
    grid: "hsl(217.2 32.6% 17.5%)",
    tooltip: "hsl(210 40% 98%)",
    axis: "hsl(210 40% 98%)",
    range: {
      "chart-1": "hsl(197.2 82.2% 60.4%)",
      "chart-2": "hsl(262.1 83.3% 57.8%)",
      "chart-3": "hsl(358.4 75.6% 50.9%)",
      "chart-4": "hsl(47.9 95.8% 53.1%)",
      "chart-5": "hsl(127.9 79.6% 50.9%)",
    },
  },
}

type ChartConfig = {
  [k: string]: {
    label?: string
    color?: string
    icon?: React.ComponentType
  }
}

type ChartContextProps = {
  config: ChartConfig
} & (
  | {
      data: Record<string, any>[]
      categories: string[]
    }
  | {
      data?: never
      categories?: never
    }
)

const ChartContext = React.createContext<ChartContextProps | null>(null)

function ChartProvider({ config, data, categories, children }: ChartContextProps & { children: React.ReactNode }) {
  return <ChartContext.Provider value={{ config, data, categories }}>{children}</ChartContext.Provider>
}

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    config: ChartConfig
    data?: Record<string, any>[]
    categories?: string[]
  }
>(({ id, className, children, config, data, categories, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId}`
  return (
    <ChartProvider config={config} data={data} categories={categories}>
      <div
        ref={ref}
        id={chartId}
        className={cn("flex aspect-video justify-center text-foreground", className)}
        {...props}
      >
        <style suppressHydrationWarning>
          {`
            .chart-${chartId}-tooltip {
              background: ${COLORS.light.tooltip};
              border-color: ${COLORS.light.grid};
              color: ${COLORS.light.axis};
            }
            .dark .chart-${chartId}-tooltip {
              background: ${COLORS.dark.tooltip};
              border-color: ${COLORS.dark.grid};
              color: ${COLORS.dark.axis};
            }
            ${Object.entries(config)
              .map(
                ([key, value]) => `
                .chart-${chartId}-${key}-stroke {
                  stroke: ${value.color || COLORS.light.range["chart-1"]};
                }
                .chart-${chartId}-${key}-fill {
                  fill: ${value.color || COLORS.light.range["chart-1"]};
                }
                .dark .chart-${chartId}-${key}-stroke {
                  stroke: ${value.color || COLORS.dark.range["chart-1"]};
                }
                .dark .chart-${chartId}-${key}-fill {
                  fill: ${value.color || COLORS.dark.range["chart-1"]};
                }
              `,
              )
              .join("")}
          `}
        </style>
        {children}
      </div>
    </ChartProvider>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = RechartsPrimitive.Tooltip as React.FC<
  RechartsPrimitive.TooltipProps & React.RefAttributes<HTMLDivElement>
>

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> &
    Pick<RechartsPrimitive.TooltipProps, "payload" | "label" | "formatter"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      is
    }
>(({ className, payload, label, formatter, hideLabel = false, hideIndicator = false, ...props }, ref) => {
  const { config } = useChart()

  if (!payload || payload.length === 0) {
    return null
  }

  const displayedPayload = payload.filter((item) => item.type !== "none")

  return (
    <div ref={ref} className={cn("chart-tooltip rounded-lg border bg-background p-2 shadow-md", className)} {...props}>
      {!hideLabel && label !== undefined && <div className="mb-1 text-sm font-medium">{label}</div>}
      <div className="grid gap-1">
        {displayedPayload.map((item: any) => {
          const key = item.dataKey || item.name
          const configItem = key ? config[key] : undefined

          if (!configItem) {
            return null
          }

          return (
            <div key={item.dataKey} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {!hideIndicator && (
                  <div
                    className={cn(
                      "h-3 w-3 shrink-0 rounded-full",
                      configItem.color ? `bg-[${configItem.color}]` : `bg-chart-${(item.index % 5) + 1}`,
                    )}
                    style={{
                      backgroundColor: configItem.color ?? "",
                    }}
                  />
                )}
                <span className="text-muted-foreground">{configItem.label || item.name}</span>
              </div>
              {formatter ? (
                <span className="font-medium">{formatter(item.value, item.name, item, item.index)}</span>
              ) : (
                <span className="font-medium">{item.value}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend as React.FC<
  RechartsPrimitive.LegendProps & React.RefAttributes<HTMLDivElement>
>

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & Pick<RechartsPrimitive.LegendProps, "payload">
>(({ className, payload, ...props }, ref) => {
  const { config } = useChart()

  if (!payload || payload.length === 0) {
    return null
  }

  return (
    <div ref={ref} className={cn("flex flex-wrap items-center justify-center gap-4", className)} {...props}>
      {payload.map((item: any) => {
        const key = item.dataKey || item.name
        const configItem = key ? config[key] : undefined

        if (!configItem) {
          return null
        }

        return (
          <div key={item.value} className="flex items-center gap-1.5">
            <div
              className={cn(
                "h-3 w-3 shrink-0 rounded-full",
                configItem.color ? `bg-[${configItem.color}]` : `bg-chart-${(item.index % 5) + 1}`,
              )}
              style={{
                backgroundColor: configItem.color ?? "",
              }}
            />
            <span className="text-muted-foreground">{configItem.label || item.name}</span>
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent }
