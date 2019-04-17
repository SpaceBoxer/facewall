<template>
  <div :style="{backgroundColor: backgroundColor}" class="container">
    <div class="employee-grid-view" @click="onEmployeeViewClick"></div>
    <div v-if="modalViewDisplay" class="fixed-bottom-view flex-column-center modal-view flip-in-y"
         @click.stop>
      <div class="big-avatar">
        <img class="big-avatar" :src="currentEmployee.avatar" alt="user avatar">
      </div>
      <div class="flex-column-around modal-role-view">
        <span class="name">{{currentEmployee.firstName}}{{currentEmployee.lastName}}</span>
        <span class="role">{{currentEmployee.role}}</span>
      </div>
    </div>
    <div v-if="searchViewDisplay" class="search-view search-view-opened fly-in"></div>
  </div>
</template>

<script>
  import config from '../../config';
  import initializeEmployees from './initialize-employees';
  import {Url, Util} from '../../utils/index';

  const employeeFeaturedClass = 'employee-featured';

  export default {
    name: 'home',
    data() {
      return {
        searchViewDisplay: false,
        modalViewDisplay: false,
        backgroundColor: config.style.background,
        currentEmployee: {}
      };
    },
    mounted() {
      this.hideLoader();
      // window.onresize = this.requestEmployees;
      this.requestEmployees();
    },
    methods: {
      async requestEmployees() {
        let self = this;
        const employees = await initializeEmployees();
        this.currentEmployee = employees[Math.floor(Math.random() * employees.length)];
        self.employees = employees;
        self.render(employees);
      },
      hideLoader() {
        const loaderDom = document.querySelector('#facewall-loader');
        if (!loaderDom) {return;}
        loaderDom.style.display = 'none';
      },
      render(users) {
        let self = this;
        const gridContainerDom = self.$el.querySelector('.employee-grid-view');
        if (!gridContainerDom) {return;}
        self.columnWidth = config.columnWidth;
        const grid = self.getGrid(self.columnWidth);
        const gridLen = grid.length;
        const userLen = users.length;
        const totalRowCount = Math.ceil(userLen / gridLen);
        let currentRowCount = 0;
        let rowBucket = [];
        console.log('总数：', totalRowCount, '行数：', userLen);
        users.forEach((v, i) => {
          const row = self.createEmployeeRow(`employee-row${currentRowCount === totalRowCount ? ' employee-row-bottom' : ''}`);
          if (rowBucket.length === gridLen) {
            gridContainerDom.insertAdjacentHTML('beforeend', row);
            const rowDom = gridContainerDom.querySelectorAll('.employee-row')[currentRowCount];
            if (!rowDom) {return;}
            rowBucket.forEach((rowEl, rowIndex) => {
              const ii = (currentRowCount * gridLen) + rowIndex;
              setTimeout(function () {
                const cellDom = self.createEmployeeCell(users[ii], ii, grid[rowIndex], grid[0]);
                rowDom.insertAdjacentHTML('beforeend', cellDom);
              }, ii * 30);
            });
            rowBucket = [];
            currentRowCount++;
          }
          rowBucket.push(v);
        });
        if (currentRowCount < totalRowCount) {
          const row = self.createEmployeeRow('employee-row employee-row-bottom');
          gridContainerDom.insertAdjacentHTML('beforeend', row);
          const rowDom = gridContainerDom.querySelectorAll('.employee-row')[currentRowCount];
          if (!rowDom) {return;}
          const remainderUsers = users.slice(currentRowCount * gridLen);
          const remainderUsersLen = remainderUsers.length;
          remainderUsers.forEach((v, i) => {
            const ii = userLen - remainderUsersLen + i;
            setTimeout(function () {
              const cellDom = self.createEmployeeCell(users[ii], ii, grid[0], grid[i]);
              rowDom.insertAdjacentHTML('beforeend', cellDom);
            }, ii * 30);
          });
          currentRowCount++;
        }
      },
      createEmployeeRow(className = '') {
        return `<div class="flex-row ${className}"></div>`;
      },
      createEmployeeCell(item, index, width, height) {
        return `<div class="fly-in employee" data-index="${index}" data-id="${item.id}" data-email="${item.email}" style="width: ${width}px; height: ${height}px;"><img class="photo" src="${item.avatar}" alt=""><span class="flex-column-center name fade-in">${item.firstName}<br />${item.lastName}</span></div>`;
      },
      getGrid(columnWidth, attempts) {
        let grid, options;
        options = {
          width: window.innerWidth,
          minColumns: 5,
          maxColumns: 100,
          minWidth: parseInt(columnWidth * 0.7, 10),
          maxWidth: parseInt(columnWidth * 1.3, 10)
        };
        attempts = attempts || 0;
        grid = this.getOptimumGridColumnWidths(options);
        if (attempts > 20) {
          return grid;
        }
        if (grid.length === 1) {
          options.width -= 1;
          return this.getGrid(options, attempts + 1);
        } else {
          return grid;
        }
      },
      getOptimumGridColumnWidths(options) {
        let candidateWidth, currentBestNumColumns, currentBestWidth, j, num, numColumns, ref, ref1, remainder;
        currentBestWidth = options.width;
        currentBestNumColumns = 1;
        for (numColumns = j = ref = options.minColumns, ref1 = options.maxColumns; (ref <= ref1 ? j < ref1 : j > ref1); numColumns = ref <= ref1 ? ++j : --j) {
          candidateWidth = parseInt(options.width / numColumns, 10);
          if ((options.minWidth < candidateWidth && candidateWidth < options.maxWidth)) {
            currentBestWidth = candidateWidth;
            currentBestNumColumns = numColumns;
          }
        }
        remainder = options.width % currentBestWidth;
        let k, ref2, results;
        results = [];
        for (num = k = 1, ref2 = currentBestNumColumns; (1 <= ref2 ? k <= ref2 : k >= ref2); num = 1 <= ref2 ? ++k : --k) {  // eslint-disable-line
          results.push(currentBestWidth + (num === currentBestNumColumns ? remainder : 0));
        }
        return results;
      },
      onEmployeeViewClick(e) {
        let self = this;
        const employeeCellDom = e.target;
        const employeeDom = employeeCellDom && employeeCellDom.parentNode;
        const index = parseInt(employeeDom.getAttribute('data-index'));
        if (isNaN(index) || self.currentEmployee.id === self.employees[index].id) {return;}
        self.$el.querySelectorAll(`.${employeeFeaturedClass}`).forEach(el => {
          el.classList.remove(employeeFeaturedClass);
        });
        employeeDom.classList.add(employeeFeaturedClass);
        self.modalViewDisplay = false;
        self.currentEmployee = self.employees[index];
        setTimeout(() => {
          self.modalViewDisplay = true;
        }, 100);
      },
      onMaskClick() {
        this.modalViewDisplay = false;
      }
    }
  };
</script>

<style lang="less">
  @import "./style";
</style>
