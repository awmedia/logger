// Define types
export const EMERGENCY = 'emergency';       // Emergency: system is unusable
export const ALERT = 'alert';               // Alert: action must be taken immediately
export const CRITICAL = 'critical';         // Critical: critical conditions
export const ERROR = 'error';               // Error: error conditions
export const WARNING = 'warning';           // Warning: warning conditions
export const NOTICE = 'notice';             // Notice: normal but significant condition
export const INFO = 'info';                 // Informational: informational messages
export const DEBUG = 'debug';               // Debug: debug-level messages

// Define levels
export const LEVEL_NONE = 0;
export const LEVEL_EMERGENCY = 1;
export const LEVEL_ALERT = 2;
export const LEVEL_CRITICAL = 4;
export const LEVEL_ERROR = 8;
export const LEVEL_WARNING = 16;
export const LEVEL_NOTICE = 32;
export const LEVEL_INFO = 64;
export const LEVEL_DEBUG = 128;
export const LEVEL_ALL = 255;
