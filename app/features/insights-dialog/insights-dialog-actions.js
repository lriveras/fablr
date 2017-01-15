const openInsights = (post) => {
    return {
        type: 'OPEN_INSIGHTS',
        insightsOpen: true,
        insightsLoading: true,
        post,
        insightsLoadedCount: 0,
        insightCharts: {
            impressionSummary: [],
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

const insightMetricLoaded = (metric, metricType) => {
    return {
        type: 'INSIGHT_METRIC_LOADED',
        metric: metric,
        metricType: metricType
    }
};

const insightsPresented = () => {
    return {
        type: 'INSIGHTS_PRESENTED',
        insightsLoading: false
    }
};

const closeInsights = () => {
    return {
        type: 'CLOSE_INSIGHTS',
        insightsOpen: false
    }
};

export { openInsights, insightMetricLoaded, insightsPresented, closeInsights };