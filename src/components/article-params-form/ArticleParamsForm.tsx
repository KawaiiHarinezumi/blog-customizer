import { ArrowButton } from '../arrow-button/ArrowButton';
import { Button } from '../button/Button'
import { RadioGroup } from '../radio-group/RadioGroup';
import { Select } from '../select/Select';
import { Separator } from '../separator/Separator';
import { Text } from '../text/Text';

import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import React, { FormEvent, useRef, useState } from 'react';

type TArticleParamsProps = {
	state: ArticleStateType;
	onChange: (parameters: ArticleStateType) => void;
};

export const ArticleParamsForm = ( { state, onChange }: TArticleParamsProps ) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [articleState, setArticleState] = useState({...state});
	const rootRef = useRef<HTMLDivElement | null>(null);
	
	const handleClickForVisible = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleReset = () => {
		setArticleState( {...defaultArticleState} );
		onChange( {...defaultArticleState} );
	};

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleState(articleState);
		onChange(articleState);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: rootRef,
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton onClick={handleClickForVisible} isOpen={isMenuOpen}/>
			<aside 
				className={clsx(styles.container, isMenuOpen && {[styles.container_open]: isMenuOpen })}
				ref={rootRef}
			>
				<form 
					className={styles.form}
					onSubmit={handleSubmit}
					onClick={(evt) => evt.stopPropagation()}
				>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
							Задайте параметры
					</Text>
					<Select
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected) => {
							setArticleState( {
								...articleState,
								fontFamilyOption: selected,
							});
						}}
					/>
					<RadioGroup
						name='font-size'
						selected={articleState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={ (selected) => {
							setArticleState({
								...articleState,
								fontSizeOption: selected,
							});
						}}
					/>
					<Select
						selected={articleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected) => {
							setArticleState({
								...articleState,
								fontColor: selected,
							});
						}}
					/>
					<Separator />
					<Select
						selected={articleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected) => {
							setArticleState({
								...articleState,
								backgroundColor: selected,
							});
						}}
					/>
					<Select
						selected={articleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected) => {
							setArticleState({
								...articleState,
								contentWidth: selected,
							});
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};