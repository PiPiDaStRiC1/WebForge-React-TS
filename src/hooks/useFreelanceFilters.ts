import { useSearchParams } from "react-router-dom";

export const useFreelanceFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const get = <T>(key: string, parser: (v: string) => T, defaultValue: T): T => {
        const value = searchParams.get(key);
        if (value) {
            return parser(value);
        } else {
            return defaultValue
        }
    }

    const toggle = (key: string, value: string, defaultValue?: string) => {
        const currentParams = get(key, (v) => v.split(','), []);

        const next = currentParams.includes(value) ? 
            currentParams.filter(p => p !== value) :
            [...currentParams, value];

        set(key, next, [defaultValue ?? '']);
    }

    const set = (key: string, value: string | Array<string>, defaultValue?: string | Array<string>) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            
            const isEmpty = value === '' || (Array.isArray(value) && value.length === 0);
            const isDefault = JSON.stringify(value) === JSON.stringify(defaultValue);
            
            if (isEmpty || isDefault) {
                params.delete(key);
            } else {
                if (typeof value === 'string') {
                    params.set(key, value);
                } else {
                    const filtered = value.filter(Boolean);
                    if (filtered.length > 0) {
                        params.set(key, filtered.join(','));
                    } else {
                        params.delete(key);
                    }
                }
            }

            return params;
        });
    }

    const setRange = (key: string, [minValue, maxValue]: [string, string], defaultValue?: [string, string]) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);

            const isMinDefaultEmpty = defaultValue ? minValue === defaultValue[0] : minValue === '';
            const isMaxDefaultEmpty = defaultValue ? maxValue === defaultValue[1] : maxValue === '';

            if (isMinDefaultEmpty && isMaxDefaultEmpty) params.delete(key);

            else params.set(key, `${minValue}-${maxValue}`);

            return params;
        });
    }

    const getRange = (key: string, defaultValue: [string, string]) => {
        const value = searchParams.get(key);
        if (value) {
            return value.split('-');
        } else {
            return defaultValue
        }
    }

    const resetFilters = () => {
        setSearchParams({});
    }

    return {set, get, resetFilters, toggle, setRange, getRange, searchParams}
}