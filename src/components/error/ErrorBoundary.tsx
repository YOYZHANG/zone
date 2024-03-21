import {Component, ReactNode} from 'react';

interface ChildrenComponent {
    // 定义你的 props 类型
    children: ReactNode;
}

export class ErrorBoundary extends Component<ChildrenComponent> {
    state: {
        hasError: boolean;
    };
    constructor(props: ChildrenComponent | Readonly<ChildrenComponent>) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }
    render() {
        if (this.state.hasError) {
            return <div className="h-screen p-10 text-center">Oops! Something went wrong, please try again.</div>;
        }
        return this.props.children;
    }
}
