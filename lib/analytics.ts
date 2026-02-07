type EventType = 'SKILLS_SUBMITTED' | 'JOB_CLICKED' | 'FILTER_USED' | 'ERROR';

interface EventProperties {
    [key: string]: string | number | boolean;
}

class Analytics {
    private static isDev = process.env.NODE_ENV === 'development';

    /**
     * Track a user action
     */
    static track(event: EventType, properties?: EventProperties) {
        if (this.isDev) {
            console.groupCollapsed(`[Analytics] ${event}`);
            console.log(properties);
            console.groupEnd();
        } else {
            // TODO: Connect to Mixpanel / Vercel Analytics / Google Analytics here
            // Example: window.gtag('event', event, properties);
            console.log(`[Prod Analytics] ${event}`, properties);
        }
    }

    /**
     * Log an error with context
      */
    static error(error: unknown, context: string) {
        console.error(`[Error] ${context}:`, error);
        this.track('ERROR', { context, message: error instanceof Error ? error.message : String(error) });
    }
}

export default Analytics;
