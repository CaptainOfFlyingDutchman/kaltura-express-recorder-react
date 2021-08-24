import {render} from 'react-dom';

import { ExpressRecorder, ExpressRecorderProps } from "./components/App/ExpressRecorder";
import { version } from "./version";

interface CreateReturnType {
    destroy: () => void;
    instance: ExpressRecorder;
    version: string
}

export const create = (
    elementId: string,
    props: ExpressRecorderProps
): CreateReturnType => {
    const parent = document.getElementById(elementId);

    if (!parent) {
        throw new Error(`cannot find element with id '${elementId}'`);
    }

    let instance: any;
    let ref = (c: any) => {
        instance = c;
    };

    const child = render(<ExpressRecorder ref={ref} {...props} />, parent);

    return {
        destroy: () => {
            instance.destroy();
            // TODO -> Find a way to re-add this line
            // render(null, parent, child);
        },
        instance,
        version
    };
};
