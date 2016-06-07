namespace Contracts {
	
	export interface StateItem {
		estimate?: number
		risk?: number
		sprint?: string
		priority?: number

		calculatedEstimate?: number
		calculatedPriority?: number
		calculatedSprint?: string

		item: Contracts.RawData
	}
}