import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
}));

const Accordion = withStyles({
    root: {
        boxShadow: "none",
        "&:before": {
            display: "none"
        },
        "&$expanded": {
            margin: "auto"
        }
    },
    expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        marginBottom: -1,
        minHeight: 56,
        "&$expanded": {
            minHeight: 56
        }
    },
    content: {
        "&$expanded": {
            margin: "12px 0"
        }
    },
    expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiAccordionDetails);

export default function Changelogs() {
    const classes = useStyles();
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                    April 4
                    <br/>
                    <br/>
                    Decades of new data on backtests, complete rework of the interface and Bittrex, ByBit  and Coinbase Pro support for our US friends! 🎉
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="caption">
                    <p>Release Notes April 4:</p>
                    <ul>
                        <li>
                            NEW Interface! <br/>
                            All charts have been re-made with a specific attention to <strong>performance, ease of use and esthetics.</strong><br/>
                            Especially, backtest charts now us candlesticks and are 60FPS likes games! 
                        </li>
                        <li>
                            New Backtesting data: we've added decades of data to backtests so that you can polish your strategies as never before!
                            Backtests are much faster.
                        </li>
                        <li>
                            Kaktana now supports Bittrex, Coinbase Pro and ByBit!<br/> 
                        </li>
                    </ul>
                    <p>Release Notes March 18:</p>
                    <ul>
                        <li>
                            You can now make money when the market loses value.
                            We've added a short option to your bots so that they
                            can sell before they buy and enter a short position.
                        </li>
                        <li>
                            The interface for trailing conditions is now
                            clearer.
                        </li>
                        <li>Many bug fixes.</li>
                        <li>Many performance improvements.</li>
                    </ul>
                    <p>Release Notes February 29:</p>
                    <ul>
                        <li>
                            You can now set different fees for limit and market
                            orders in your bot and backtest recaps. Certain
                            exchanges (e.g. Bitmex) even have negative fees
                            (where they give you money) when placing limit
                            orders.
                        </li>
                        <li>Many bug fixes.</li>
                        <li>Many performance improvements.</li>
                    </ul>
                    <p>Release Notes December 24:</p>
                    <ul>
                        <li>
                            Limit buy orders are now available: <br />
                            Set multiple buy targets to lower your average buy
                            price and increase your win probability.
                        </li>
                        <li>Rework of the mobile UI</li>
                        <li>
                            You can now see the current profit of an opened
                            position
                        </li>
                        <li>Performance improvements.</li>
                    </ul>
                    And above all: merry Christmas!
                    <p>Release Notes October 28:</p>
                    <ul>
                        <li>
                            Bots are now faster (~25s refresh period). <br />
                            We're working on improving it and going down to 5s.
                        </li>
                        <li>Graphic rework of the UI</li>
                    </ul>
                    <p>Release Notes September 5:</p>
                    <ul>
                        <li>
                            Backtests have more recent data (until September
                            4th){" "}
                        </li>
                        <li>
                            Heikin ashi candle type is now available in the
                            "Candle part" section
                        </li>
                        <li>Some interface improvements</li>
                    </ul>
                    <p>Release Notes August 26:</p>
                    <ul>
                        <li>Backtests are 30% faster. </li>
                        <li>
                            When there's an error (e.g. a timeperiod of 1), a
                            dialog opens to report it.
                        </li>
                    </ul>
                    <p>Release Notes August 23:</p>
                    <ul>
                        <li>
                            Telegram bot improvements: manage your positions and
                            enable bots directly from Telegram.
                        </li>
                        <li>
                            Trailing Stop Loss and Trailing Buy. They are still
                            experimental, use at your own risk..
                        </li>
                    </ul>
                    <p>Release Notes August 20:</p>
                    <ul>
                        <li>Backtest is now 30-50% faster.</li>
                        <li>New "MA Gradient" premade strategy.</li>
                        <li>
                            Improvements on the "EMA + RSI" premade strategy.
                        </li>
                    </ul>
                    <p>Release Notes August 2:</p>
                    <ul>
                        <li>
                            New "Biggest monthly drawdown" stat on backtests and
                            bot logs.
                        </li>
                        <li>
                            New interface to easily set symbols and allocated
                            amount for the bots.
                        </li>
                        <li>
                            New button to refresh the assets manually in the
                            dashboard.
                        </li>
                        <li>Bug fixes.</li>
                    </ul>
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}
