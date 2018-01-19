import React from 'react';
import {
	connect
} from 'dva';
import {
	Tabs,
	Form,
	Icon,
	Input,
	Button,
	Row,
	Col,
	Alert
} from 'antd';
import styles from './Login.less';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class Login extends React.Component {
	constructor(props){
		super(props);
		console.log(props);
		this.state = {
			count: 0,
			type: 'account'
		}
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields({
				force: true
			},
			(err, values) => {
				if (!err) {
					this.props.dispatch({
						type: 'login/login',
						payload: {
							...values,
							type: this.state.type
						}
					})
				}
			})
	}
	onSwitch = (type) => {
		this.setState({
			type
		});
	}
	onGetCaptcha = () => {
		let count = 59;
		this.setState({
			count
		});
		this.interval = setInterval(() => {
			count -= 1;
			this.setState({
				count
			});
			if (count === 0) {
				clearInterval(this.interval);
			}
		}, 1000)
	}
	render() {
		const {
			getFieldDecorator
		} = this.props.form;
		const login = this.props.login;
		//console.log(login);
		const {
			count,
			type
		} = this.state;
		return (
			<div className={styles.main}>
				<Tabs animated={false} className={styles.tabs} defaultActiveKey="account" activeKey={type} onChange={this.onSwitch}>
					<TabPane key="account" tab="账户密码登录">
						{
							login.status==false&&
							login.type=="account"&&
							<Alert 
								type="error" 
								message="用户名与密码不匹配！" 
								banner 
								className={styles.errMsg}
								visible={false}
							/>
						}
						<Form onSubmit={this.handleSubmit}>
							<FormItem>
							{
								getFieldDecorator("userName",{
									rules:[{
										required:type==='account',
										message:'请输入用户名'
									}],
								})
								(
									<Input 
										prefix={<Icon type="user" />} 
										placeholder="请输入用户名" 
									/>
								)
							}
								
							</FormItem>
							<FormItem>
							{
								getFieldDecorator("password",{
									rules:[{
										required:type==='account',
										message:'请输入密码'
									}],
								})
								(
									<Input
				                    	prefix={<Icon type="lock" />}
				                    	type="password"
				                    	placeholder="请输入密码"
				                 	/>
				                )
							}
							</FormItem>
							<FormItem>
								<Button 
									type="primary"
									htmlType="submit"
									loading={login.submitting}
									className={styles.submit}
								>登录</Button>
							</FormItem>
						</Form>
					</TabPane>
					<TabPane key="mobile" tab="手机号登录">
						{
							login.status==false&&
							login.type=="mobile"&&
							<Alert 
								type="error" 
								message="验证码错误！" 
								banner 
								className={styles.errMsg}
								visible={false}
							/>
						}
						<Form onSubmit={this.handleSubmit}>
							<FormItem>
							{
								getFieldDecorator("mobileNumber",{
									rules:[{
										required:type==='mobile',
										message:'请输入手机号'
									},{
										pattern:/^1\d{10}$/,message:'手机号格式错误'
									}]
								})
								(
									<Input 
										prefix={<Icon type="mobile" />} 
										placeholder="手机号" 
									/>
								)
							}
								
							</FormItem>
							<FormItem>
								<Row gutter={8}>
									<Col span={16}>
									{
										getFieldDecorator("captcha",{
											rules:[{
												required:type==='mobile',
												message:'请输入验证码'
											}],
										})
										(
											<Input
							                    prefix={<Icon type="mail" />}
							                    placeholder="验证码"
							                 />
										)
									}
									</Col>
									<Col span={8}>
										<Button
											disabled={count}
											className={styles.getCaptcha}
											onClick={this.onGetCaptcha}
										>
											{count?`${count} s`:'获取验证码'}
										</Button>
									</Col>
								</Row>
							</FormItem>
							<FormItem>
								<Button 
									type="primary"
									htmlType="submit"
									loading={login.submitting}
									className={styles.submit}
								>登录</Button>
							</FormItem>
						</Form>
					</TabPane>
				</Tabs>
			</div>
		);
	}
}


export default connect(state => ({
	login: state.login
}))(Form.create()(Login));