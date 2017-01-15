const insightsDialogReducer = {
    insightsOpen: false,
    insightsLoading: false,
    insightsData: {
        post:{},
        insightsLoadedCount: 0,
        insightCharts: {
            impressionSummary:[],
            paidVsNonPaidImpressions: [],
            organicVsViral: [],
            engagementSummary: [],
            consumptions: []
        }
    }
};

export default insightsDialogReducer;