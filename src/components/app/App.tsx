import { createRoot } from 'react-dom/client';
import React, { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from '../../constants/articleProps';

import styles from './App.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export const App = () => {
	const [articleAppState, setArticleAppState] = useState<ArticleStateType>({
		...defaultArticleState,
	});

	return (
		<main
			className={styles.main}
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
		</main>
	);
};