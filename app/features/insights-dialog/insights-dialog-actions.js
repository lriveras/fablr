const openInsights = (post) => {
    return {
        type: 'OPEN_INSIGHTS',
        insightsOpen: true,
        insightsLoading: true,
        insightsFetching: false,
        post,
        insightsLoadedCount: 0,
        insightCharts: {
            impressionSummary: [],
            paidVsNonPaidImpressions: [],
            organicVsViral: [],
            engagementSummary: [],
            consumptions: []
        }
    }
};

const fetchInsights = () => {
    return {
        type: 'FETCH_INSIGHTS',
        insightsFetching: true,
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
        insightsLoading: false,
        insightsFetching: false,
    }
};

const closeInsights = () => {
    return {
        type: 'CLOSE_INSIGHTS',
        insightsOpen: false,
    }
};

export { openInsights, insightMetricLoaded, insightsPresented, closeInsights, fetchInsights };