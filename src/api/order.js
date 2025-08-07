// src/api/order.ts
import { Inject, Controller, Get, Post, Body, Param, Query, Del } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';

@Controller('/order')
export class OrderController {
  @Inject()
  ctx

  @Inject()
  orderService

  @Post('/')
  @Validate()
  async createOrder(body) {
    const { userId, blindBoxId } = body;
    
    try {
      const order = await this.orderService.createOrder(userId, blindBoxId);
      return {
        success: true,
        message: '订单创建成功',
        data: order
      };
    } catch (error) {
      this.ctx.status = 500;
      return {
        success: false,
        message: error.message || '订单创建失败'
      };
    }
  }

  @Get('/')
  @Validate()
  async getUserOrders(query) {
    const { userId, page = 1, limit = 10 } = query;
    
    try {
      const { orders, total } = await this.orderService.getUserOrders(userId, page, limit);
      return {
        success: true,
        data: {
          list: orders,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        }
      };
    } catch (error) {
      this.ctx.status = 500;
      return {
        success: false,
        message: error.message || '获取订单列表失败'
      };
    }
  }

  @Get('/:id')
  async getOrderDetail(id) {
    try {
      const order = await this.orderService.getOrderDetail(id);
      if (!order) {
        this.ctx.status = 404;
        return {
          success: false,
          message: '订单不存在'
        };
      }
      
      return {
        success: true,
        data: order
      };
    } catch (error) {
      this.ctx.status = 500;
      return {
        success: false,
        message: error.message || '获取订单详情失败'
      };
    }
  }

  @Del('/:id')
  async deleteOrder(id) {
    try {
      const result = await this.orderService.deleteOrder(id);
      if (!result) {
        this.ctx.status = 404;
        return {
          success: false,
          message: '订单不存在'
        };
      }
      
      return {
        success: true,
        message: '订单删除成功'
      };
    } catch (error) {
      this.ctx.status = 500;
      return {
        success: false,
        message: error.message || '删除订单失败'
      };
    }
  }
}