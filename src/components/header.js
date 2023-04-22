import React, {Component} from 'react'

import styles from './header.module.scss';

export default class Header extends Component {
    render() {
        return (
            <div className={styles.head}>
                <div className={styles.title}>
                    <a className={styles.game} href="https://store.steampowered.com/app/1562430/DREDGE/" target="_blank">
                        DREDGE
                    </a>
                    &nbsp;Item Builder
                </div>
                <div className={styles.tag}>
                    Easily design custom items for
                    &nbsp;
                    <a href="https://github.com/Hacktix/Winch" target="_blank">
                        Winch
                    </a>
                </div>
                <div className={styles.credit}>
                    built by&nbsp;
                    <span>
                        bluey#2108
                    </span>
                </div>
            </div>
        )
    }
}
