import { drawCanvas, drawLegend, drawPieDataPoints, drawLineDataPoints, drawAreaDataPoints, drawColumnDataPoints, drawYAxis, drawXAxis } from './draw'
import { calYAxisData, getPieTextMaxLength } from './charts-data'
import { fillSeriesColor } from './charts-util';
import Animation from './animation'

export default function drawCharts (type, opts, config, context) {
    let series = opts.series;
    let categories = opts.categories;
    series = fillSeriesColor(series, config);

    let { yAxisWidth } = calYAxisData(series, opts, config);
    config.yAxisWidth = yAxisWidth;
    config._pieTextMaxLength_ = getPieTextMaxLength(series);

    let duration = opts.animation ? 1000 : 0;

    switch (type) {
        case 'line':
            Animation({
                timing: 'easeIn',
                duration: duration,
                onProcess: (process) => {
                    drawYAxis(series, opts, config, context);
                    drawXAxis(categories, opts, config, context);
                    drawLineDataPoints(series, opts, config, context, process);
                    drawLegend(opts.series, opts, config, context);                    
                    drawCanvas(opts, context);
                }
            });
            break;
        case 'column':
            Animation({
                timing: 'easeIn',
                duration: duration,
                onProcess: (process) => {
                    drawYAxis(series, opts, config, context);
                    drawXAxis(categories, opts, config, context);
                    drawColumnDataPoints(series, opts, config, context, process);
                    drawLegend(opts.series, opts, config, context);                    
                    drawCanvas(opts, context);
                }
            });
            break;
        case 'area':
            Animation({
                timing: 'easeIn',
                duration: duration,
                onProcess: (process) => {
                    drawYAxis(series, opts, config, context);
                    drawXAxis(categories, opts, config, context);
                    drawAreaDataPoints(series, opts, config, context, process);
                    drawLegend(opts.series, opts, config, context);                    
                    drawCanvas(opts, context);
                }
            });
            break;
        case 'ring':
        case 'pie':
            Animation({
                timing: 'easeInOut',
                duration: duration,
                onProcess: (process) => {
                    drawPieDataPoints(series, opts, config, context, process);
                    drawLegend(opts.series, opts, config, context);
                    drawCanvas(opts, context);
                }
            });
            break;
    }
}