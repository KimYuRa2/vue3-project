// toRefs (reactive 값을 ref 값으로 변환하는 toRefs) 사용예제

import { reactive, toRefs } from 'vue';

export const useCount = () => {
    const state = reactive ({ // 객체자체는 reactive한데, 그 안의 프로퍼티 값(count)는 reactive하지않음 => 그래서 toRefs 사용!
        count:0
    });

    return toRefs(state); // convert to ref!!
}