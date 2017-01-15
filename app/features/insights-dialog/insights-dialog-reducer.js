const insightsDialogReducer = (state,
    {type, insightsOpen, insightsLoading,insightsFetching, post,
        insightsLoadedCount, insightCharts, metric, metricType}) => {
    if (type === 'OPEN_INSIGHTS') {
        return Object.assign({}, state, { insightsOpen, insightsLoading, insightsData:{post, insightsLoadedCount, insightCharts}});
    }
    else if (type === 'FETCH_INSIGHTS') {
        return Object.assign({}, state, { insightsFetching });
    }
    else if (type === 'INSIGHT_METRIC_LOADED') {
        const newInsightsCharts = Object.assign({}, state.insightsData.insightCharts);
        newInsightsCharts[metricType] = newInsightsCharts[metricType].concat(metric);
        const newState = Object.assign({}, state);
        newState.insightsData.insightCharts = newInsightsCharts;
        newState.insightsData.insightsLoadedCount += 1;
        return newState;
    }
    else if (type === 'INSIGHTS_PRESENTED') {
        return Object.assign({}, state, { insightsLoading, insightsFetching });
    }
    else if (type === 'CLOSE_INSIGHTS') {
        return Object.assign({}, state, { insightsOpen });
    }
    else {
        return Object.assign({}, state, );
    }

};

export default insightsDialogReducer;