define(
    ['react', 'react-dom',
    './Dashboard/TopButton.react',
    './Dashboard/GlobalStats.react',
    './Dashboard/CheckStats.react',
    './Dashboard/ChecksTable.react',
    '../actions/ChecksActions',
    '../stores/ChecksStore'],
    function(React, ReactDOM, TopButton, GlobalStats, CheckStats, ChecksTable, ChecksActions, ChecksStore) {

        function getChecksState() {
            return {
                allChecks: ChecksStore.getAllChecks(),
                globalStats: ChecksStore.getGlobalStats(),
                openCheck: ChecksStore.getOpenCheck()
            };
        }
        class Dashboard extends React.Component {
            constructor() {
                super();
                this.state = getChecksState();
            }
            componentDidMount() {
                ChecksActions.populateAll();
                setInterval(ChecksActions.populateAll, 2 * 60 * 1000);
                ChecksStore.addChangeListener(this._onChange.bind(this));
            }
            componentWillUnmount() {
                ChecksStore.removeChangeListener(this._onChange.bind(this));
            }

            render() {
                return (
                    <div>
                        <div className="pane-components-wrapper">
                            <TopButton />
                            <GlobalStats globalStats={this.state.globalStats} />
                            <CheckStats openCheck={this.state.openCheck} />
                        </div>
                        <ChecksTable allChecks={this.state.allChecks} />
                    </div>
                );
            }

            _onChange() {
                this.setState(getChecksState());
            }
        }

        return Dashboard;
    }
);