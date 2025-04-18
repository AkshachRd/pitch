'use client';
import { useTranslation } from 'react-i18next';
import { Settings, Github, History } from 'lucide-react';
import { Button } from '@/components/Internal/Button';
import { useGlobalStore } from '@/store/global';

const VERSION = process.env.NEXT_PUBLIC_VERSION;

function Header() {
    const { t } = useTranslation();
    const { setOpenSetting, setOpenHistory } = useGlobalStore();

    return (
        <>
            <header className="my-6 flex items-center justify-between max-sm:my-4 print:hidden">
                <a href="https://github.com/u14app/deep-research" target="_blank">
                    <h1 className="text-left text-xl font-semibold">
                        {t('title')}
                        <small className="ml-2 text-base font-normal">v{VERSION}</small>
                    </h1>
                </a>
                <div className="flex gap-1">
                    <a href="https://github.com/u14app/deep-research" target="_blank">
                        <Button
                            className="h-8 w-8"
                            title={t('openSource')}
                            variant="ghost"
                            size="icon"
                        >
                            <Github className="h-5 w-5" />
                        </Button>
                    </a>
                    <Button
                        className="h-8 w-8"
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpenHistory(true)}
                        title={t('research.history.title')}
                    >
                        <History className="h-5 w-5" />
                    </Button>
                    <Button
                        className="h-8 w-8"
                        title={t('setting.title')}
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpenSetting(true)}
                    >
                        <Settings className="h-5 w-5" />
                    </Button>
                </div>
            </header>
        </>
    );
}

export default Header;
