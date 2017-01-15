const insightsDialogReducer = {
    insightsOpen: false,
    insightsLoading: false,
    insightsData: {
        post:{},
        insightsLoadedCount: 0,
        insightCharts: {
            impressionSummary:[],
            paidVsNonPaidImpressions: [],
            paidVsNonPaidFans: [],
            organicVsViral: [],
            engagementSummary: [],
            consumptions: [],
            consumptionsUnique: [],
            negativeFeedback: [],
            negativeFeedbackUnique: []
        }
    }
};

export default insightsDialogReducer;