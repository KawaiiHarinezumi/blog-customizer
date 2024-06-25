import { createRoot } from 'react-dom/client';
import React, { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleAppState, setArticleAppState] = useState<ArticleStateType>({
		...defaultArticleState,
	});

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleAppState.fontFamilyOption.value,
					'--font-size': articleAppState.fontSizeOption.value,
					'--font-color': articleAppState.fontColor.value,
					'--container-width': articleAppState.contentWidth.value,
					'--bg-color': articleAppState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm state={articleAppState} onChange={setArticleAppState}/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
